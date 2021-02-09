//@ts-check
const Models = require("../../../models");
var questions = [];

module.exports = (app, db) => {
    app.get("/admin/assessments", (req, res) => {
        if (req.session.user) {
            let modelData = {
                assessments: []
            };
            Models.AssessmentModel.find({
                status: 'ACTIVE'
            }, "name email assessmentCode assessmentStatus", function (err, data) {
                console.log(err, data);
                if (err) {

                }
                modelData.assessments = JSON.parse(JSON.stringify(data));
                res.renderVue("manage/assessment/assessment.vue", modelData, req.vueOptions);
            });
        } else {
            return res.redirect('/admin');
        }
    });

    app.get("/admin/assessment/:id", (req, res) => {
        if (req.session.user) {
            const modelData = {
                assessment: {}
            };
            Models.AssessmentModel.findById(req.params.id, (err, data) => {
                if (err) {

                }
                modelData.assessment = JSON.parse(JSON.stringify(data));
                res.renderVue("manage/assessment/view-assessment.vue", modelData, req.vueOptions);
            });
        } else {
            return res.redirect('/admin');
        }
    });

    app.get("/admin/create/assessment", (req, res) => {
        if (req.session.user) {
            const modelData = {
                buttonLabel: "Create"
            };
            res.renderVue("manage/assessment/edit-assessment.vue", modelData, req.vueOptions);
        } else {
            return res.redirect('/admin');
        }
    });

    app.post("/admin/assessment", (req, res) => {
        var d = new Date();
        var dataModel = req.body;
        dataModel['createdOn'] = d.getTime();
        dataModel['updatedOn'] = d.getTime();
        dataModel['assessmentCode'] = makeAssessmentId(10);
        dataModel['status'] = 'ACTIVE';
        dataModel['assessmentStatus'] = 'PENDING';
        // console.log(dataModel);
        questions = [];
        populateQuestions(dataModel.details, 0);
        dataModel['questions'] = questions;
        Models.AssessmentModel.findOne({
            email: req.body.email,
            status: 'ACTIVE',
            assessmentStatus: 'PENDING'
        }, (err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Internal server error."
                });
            } else {
                if (data) {
                    res.status(500).json({
                        message: "Assessment exists."
                    });
                } else {
                    Models.AssessmentModel.create(dataModel, function (err, data) {
                        // console.log(err, data)
                        if (err) {
                            res.status(500).json({
                                message: "An error occured while creating assessment."
                            });
                        }
                        res.json({
                            message: "Assessment created."
                        });
                    });
                }
            }
        });
    });

    app.get("/admin/assessment/:id/edit", (req, res) => {
        if (req.session.user) {
            const modelData = {
                buttonLabel: "Update",
                assessment: {}
            };
            Models.AssessmentModel.findById(req.params.id, (err, data) => {
                if (err) {

                }
                modelData.assessment = JSON.parse(JSON.stringify(data));
                res.renderVue("manage/assessment/edit-assessment.vue", modelData, req.vueOptions);
            });
        } else {
            return res.redirect('/admin');
        }
    });

    app.post("/admin/assessment/:id", (req, res) => {
        var d = new Date();
        var dataModel = req.body;
        dataModel['updatedOn'] = d.getTime();
        dataModel['assessmentStatus'] = 'PENDING';
        questions = [];
        populateQuestions(dataModel.details, 0);
        dataModel['questions'] = questions;
        Models.AssessmentModel.findByIdAndUpdate(req.params.id, dataModel, (err, data) => {
            console.log(err, data)
            if (err) {
                res.status(500).json({
                    message: "An error occured while updating assessment."
                });
            }
            res.json({
                message: "Assessment updated."
            });
        });
    });

    app.delete("/admin/assessment/:id", (req, res) => {
        Models.AssessmentModel.findByIdAndRemove(req.params.id, (err, data) => {
            console.log(err, data)
            if (err) {
                res.status(500).json({
                    message: "An error occured while deleting assessment."
                });
            }
            res.json({
                message: "Assessment deleted."
            });
        });
    });
};

function makeAssessmentId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function populateQuestions(assessmentDetails, count) {
    console.log(assessmentDetails.length, count);
    if (count < assessmentDetails.length) {
        const detail = assessmentDetails[count];
        console.log(detail);
        Models.QuestionModel.aggregate([{
                $sample: {
                    size: Number(detail.count)
                }
            },
            {
                $match: {
                    complexity: detail.complexity,
                    tags: {
                        $all: detail.tag.split(',')
                    },
                    status: 'ACTIVE'
                }
            }
        ]).exec((err, data) => {
            console.log(err, data)
            for (const q of JSON.parse(JSON.stringify(data))) {
                questions.push({questionId: q._id, attempted: false, userAnsewer: '', isCorrect: false });
            }
            populateQuestions(assessmentDetails, ++count);
        });
    }
}