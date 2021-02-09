//@ts-check
const Models = require("../../models");

module.exports = (app, db) => {
    app.get("/", (req, res) => {
        console.log(req.query.email, req.query.assessmentCode);
        const data = {
            email: req.query.email || '',
            assessmentCode: req.query.assessmentCode || ''
        };
        res.renderVue("assessments/register.vue", data, req.vueOptions);
    }, );

    app.post("/assessment/start",
        (req, res) => {
            Models.AssessmentModel.findOne({
                email: req.body.email,
                assessmentCode: req.body.assessmentCode,
                assessmentStatus: 'PENDING',
                status: 'ACTIVE'
            }, "email assessmentCode assessmentStatus", function (err, data) {
                console.log(err, data);
                if (err) {
                    res.status(500).json({
                        message: "An error occured while starting assessments."
                    });
                }
                const assessments = JSON.parse(JSON.stringify(data));
                res.json(assessments);
                // res.redirect(`/assessment/${assessments._id}`);
            });
        },
    );

    app.get("/assessment/:id", (req, res) => {
        // TODO Use Aggregate
        Models.AssessmentModel.findById(req.params.id, function (err, data) {
            // console.log(err, data);
            if (err) {

            }
            const assessment = JSON.parse(JSON.stringify(data));
            var questionIds = {};
            for (const q of assessment.questions) {
                questionIds[q.questionId] = q._id;
            }
            const modelData = {
                assessmentCode: assessment.assessmentCode,
                timerCount: assessment.time,
                totalQuestions: assessment.totalQuestions,
                questions: []
            }
            Models.QuestionModel.find({
                '_id': {
                    $in: Object.keys(questionIds)
                }
            }, "options type question", function (err, data) {
                // console.log(err, data);
                if (err) {

                }
                for (const q of JSON.parse(JSON.stringify(data))) {
                    modelData.questions.push({...q,...{questionId: questionIds[q._id]}});
                }
                // console.log(modelData);
                res.renderVue("assessments/assessment.vue", modelData, req.vueOptions);
            });
        });
    });

    app.post("/assessment/:assessmentCode/:id", (req, res) => {
        console.log(req.body);
        Models.AssessmentModel.findOne({
            'assessmentCode': req.params.assessmentCode
        }, function (err, data) {
            console.log(err, data);
            if (err) {
                res.status(500).json({
                    message: "An error occured while saving answer."
                });
            }
            const assessment = JSON.parse(JSON.stringify(data));
            for (const q of assessment.questions) {
                if (q._id == req.params.id) {
                    Models.QuestionModel.findOne({'_id': q.questionId}, "answer", (err, data) => {
                        // console.log(err, data);
                        if (err) {

                        }
                        const question = JSON.parse(JSON.stringify(data));
                        q.attempted = true;
                        q.userAnswer = req.body.answer;
                        q.isCorrect = (req.body.answer == question.answer) ? true : false;
                        Models.AssessmentModel.findByIdAndUpdate(assessment._id, assessment, (err, data) => {
                            // console.log(err, data);
                            if (err) {
                                res.status(500).json({
                                    message: "An error occured while updating answer."
                                });
                            }
                            res.json({
                                message: "next"
                            });
                        });
                    });
                    break;
                }

            }
        });
    });

    app.get("/assessment/:id/complete",
        (req, res) => {
            Models.AssessmentModel.findOne({'assessmentCode': req.params.id}, (err, data) => {
                console.log(err, data);
                if (err) {
                    
                }
                const assessment = JSON.parse(JSON.stringify(data));
                var totalAttempted = 0;
                var totalCorrect = 0;
                var totalWrong = 0;
                var score = 0;
                if (assessment.reviewRequired) {
                    for (const q of assessment.questions) {
                        if (q.attempted) {
                            totalAttempted += 1;
                            if (q.type == 'mcqm' || q.type == 'mcqs' || q.type == 'fixed') {
                                if (q.isCorrect) {
                                    totalCorrect += 1;
                                } else {
                                    totalWrong += 1;
                                }
                            }
                        } else {
                            totalWrong += 1;
                        }
                    }
                    const updateModel = {
                        totalAttempted: totalAttempted,
                        totalCorrect: totalCorrect,
                        totalWrong: totalWrong,
                        end: new Date(), 
                        status: 'COMPLETE'
                    }
                    Models.AssessmentModel.findByIdAndUpdate(assessment._id, updateModel, (err, data) => {
                        console.log(err, data);
                        if (err) {
                            
                        }
                        const modelData = {};
                        res.renderVue("assessments/complete.vue", modelData, req.vueOptions);
                    });
                } else {
                    
                    for (const q of assessment.questions) {
                        if (q.attempted) {
                            totalAttempted += 1;
                            if (q.isCorrect) {
                                totalCorrect += 1;
                            } else {
                                totalWrong += 1;
                            }
                        } else {
                            totalWrong += 1;
                        }
                    }
                    score = totalCorrect;
                    const updateModel = {
                        totalAttempted: totalAttempted,
                        totalCorrect: totalCorrect,
                        totalWrong: totalWrong,
                        score: score,
                        end: new Date(), 
                        status: 'COMPLETE'
                    }
                    console.log(updateModel);
                    Models.AssessmentModel.findByIdAndUpdate(assessment._id, updateModel, (err, data) => {
                        console.log(err, data);
                        if (err) {
                            
                        }
                        const modelData = {};
                        res.renderVue("assessments/complete.vue", modelData, req.vueOptions);
                    });
                }
            });
        },
    );

};