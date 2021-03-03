//@ts-check

const Models = require("../../../models");
const Utils = require('../../../utils');
const Services = require('../../../services');

const XLSX = require('xlsx');

module.exports = (app, db, upload) => {
    app.get("/admin/questions", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
        Services.AdminQuestions.fetchData(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.renderVue("manage/questions/questions.vue", data, req.vueOptions);
        });
    });

    app.get("/admin/create/question", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
        const data = {
            buttonLabel: "Create"
        };
        res.renderVue("manage/questions/edit-question.vue", data, req.vueOptions);
    });

    app.post("/admin/question", (req, res) => {
        Services.AdminQuestions.createQuestion(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(data);
        });
    });

    app.delete("/admin/question/:id", (req, res) => {
        Services.AdminQuestions.removeQuestion(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(data);
        });
    });

    app.get("/admin/question/:id/edit", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
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
    });

    app.post("/admin/question/:id", (req, res) => {
        Services.AdminQuestions.updateQuestion(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(data);
        });
    });

    app.get("/admin/question/:id", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
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
    });

    app.post("/admin/bulk/questions/upload", upload.single('uploadQuestions'), (req, res) => {
        console.log('called');
        const file = req.file;
        console.log(file);
        if (!file) {
            res.status(500).json({
                message: "An error occured while uploading file."
            });
        }
        console.log(file.filename);
        var workbook = XLSX.readFile(`uploads//${file.filename}`);
        var sheet_name_list = workbook.SheetNames;
        Services.AdminQuestions.bulkUpload(file.filename, XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]), req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(data);
        });
    });
};
