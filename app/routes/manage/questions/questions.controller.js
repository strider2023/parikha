//@ts-check

const Models = require("../../../models");

module.exports = (app) => {
    app.get("/admin/questions", (req, res) => {
        if (req.session.user) {
            let modelData = {
                questions: []
            };
            Models.QuestionModel.find({
                status: 'ACTIVE'
            }, "type question tags complexity", function (err, data) {
                console.log(err, data);
                if (err) {

                }
                modelData.questions = JSON.parse(JSON.stringify(data));
                res.renderVue("manage/questions/questions.vue", modelData, req.vueOptions);
            });
        } else {
            return res.redirect('/admin');
        }
    });

    app.get("/admin/create/question", (req, res) => {
        if (req.session.user) {
            const data = {
                buttonLabel: "Create"
            };
            res.renderVue("manage/questions/edit-question.vue", data, req.vueOptions);
        } else {
            return res.redirect('/admin');
        }
    });

    app.post("/admin/question", (req, res) => {
        var d = new Date();
        var dataModel = {
            type: req.body.type,
            question: req.body.question,
            answer: req.body.answer,
            complexity: req.body.complexity,
            options: [req.body.option1, req.body.option2, req.body.option3, req.body.option4],
            tags: req.body.tags.split(","),
            createdOn: d.getTime(),
            updatedOn: d.getTime(),
            status: 'ACTIVE'
        };
        console.log(dataModel);
        Models.QuestionModel.create(dataModel, function (err, data) {
            console.log(err, data)
            if (err) {
                res.status(500).json({
                    message: "An error occured while creating question."
                });
            }
            res.json({
                message: "Question created."
            });
        });
    });

    app.get("/admin/question/:id/edit", (req, res) => {
        if (req.session.user) {
            const modelData = {
                buttonLabel: "Update",
                question: {}
            };
            Models.QuestionModel.findById(req.params.id, function (err, data) {
                console.log(err, data);
                if (err) {

                }
                const question = JSON.parse(JSON.stringify(data));
                if (question.type == 'mcqs' || question.type == 'mcqm') {
                    modelData.question = {
                        id: question._id,
                        type: question.type,
                        question: question.question,
                        answer: question.answer,
                        complexity: question.complexity,
                        tags: question.tags.toString(),
                        option1: question.options[0],
                        option2: question.options[1],
                        option3: question.options[2],
                        option4: question.options[3]
                    };
                } else {
                    modelData.question = {
                        id: question._id,
                        type: question.type,
                        question: question.question,
                        answer: question.answer,
                        complexity: question.complexity,
                        tags: question.tags.toString(),
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: ''
                    };
                }
                res.renderVue("manage/questions/edit-question.vue", modelData, req.vueOptions);
            });
        } else {
            return res.redirect('/admin');
        }
    });

    app.post("/admin/question/:id", (req, res) => {
        // console.log(req.body);
        var d = new Date();
        var dataModel = {
            type: req.body.type,
            question: req.body.question,
            answer: req.body.answer,
            complexity: req.body.complexity,
            options: [req.body.option1, req.body.option2, req.body.option3, req.body.option4],
            tags: req.body.tags.split(","),
            updatedOn: d.getTime(),
            status: 'ACTIVE'
        };
        console.log(dataModel);
        Models.QuestionModel.findByIdAndUpdate(req.params.id, dataModel, function (err, data) {
            console.log(err, data)
            if (err) {
                res.status(500).json({
                    message: "An error occured while updating question."
                });
            }
            res.json({
                message: "Question updated."
            });
        });
    });

    app.get("/admin/question/:id", (req, res) => {
        if (req.session.user) {
            const modelData = {
                question: {}
            };
            Models.QuestionModel.findById(req.params.id, function (err, data) {
                console.log(err, data);
                if (err) {

                }
                const question = JSON.parse(JSON.stringify(data));
                if (question.type == 'mcqs' || question.type == 'mcqm') {
                    modelData.question = {
                        id: question._id,
                        type: question.type,
                        question: question.question,
                        answer: question.answer,
                        complexity: question.complexity,
                        tags: question.tags.toString(),
                        option1: question.options[0],
                        option2: question.options[1],
                        option3: question.options[2],
                        option4: question.options[3]
                    };
                } else {
                    modelData.question = {
                        id: question._id,
                        type: question.type,
                        question: question.question,
                        answer: question.answer,
                        complexity: question.complexity,
                        tags: question.tags.toString(),
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: ''
                    };
                }
                res.renderVue("manage/questions/view-question.vue", modelData, req.vueOptions);
            });
        } else {
            return res.redirect('/admin');
        }
    });
};