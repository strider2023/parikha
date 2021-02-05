//@ts-check
const Models = require("../../../models");

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
        console.log(dataModel);
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
                        console.log(err, data)
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
        Models.AssessmentModel.findByIdAndUpdate(req.params.id, dataModel, function (err, data) {
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