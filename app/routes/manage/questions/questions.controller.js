//@ts-check

const Models = require("../../../models");

const XLSX = require('xlsx');
const fs = require('fs');
// var upload = multer({ dest: 'uploads/' })

module.exports = (app, db, upload) => {
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

    app.delete("/admin/question/:id", (req, res) => {
        Models.QuestionModel.findByIdAndRemove(req.params.id, function (err, data) {
            console.log(err, data)
            if (err) {
                res.status(500).json({
                    message: "An error occured while deleting question."
                });
            }
            res.json({
                message: "Question deleted."
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

    app.post("/admin/bulk/questions/upload", upload.single('uploadQuestions'), (req, res) => {
        const file = req.file;
        if (!file) {
            res.status(500).json({
                message: "An error occured while uploading file."
            });
        }
        // console.log(file.filename);
        var workbook = XLSX.readFile(`uploads//${file.filename}`);
        var sheet_name_list = workbook.SheetNames;
        bulkUpload(file.filename, XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]), req, res);
    });
};

function bulkUpload(filename, bulkData, req, res) {
    console.log(bulkData);
    var filteredSet = [];
    var errorSet = [];
    var d = new Date();
    for (const question of bulkData) {
        if (isValidEntry(question)) {
            if (question['Question Type'] == 'mcqm' || question['Question Type'] == 'mcqs') {
                if (question['Option 1'].trim().length > 0 && question['Option 2'].trim().length > 0 && question['Option 3'].trim().length > 0 && question['Option 4'].trim().length > 0) {
                    var dataModel = {
                        type: question['Question Type'],
                        question: question['Question'],
                        answer: question['Answer'],
                        complexity: question['Complexity'],
                        options: [question['Option 1'], question['Option 2'], question['Option 3'], question['Option 4']],
                        tags: question['Tags'].split(","),
                        createdOn: d.getTime(),
                        updatedOn: d.getTime(),
                        status: 'ACTIVE'
                    };
                    console.log(dataModel);
                    filteredSet.push(dataModel);
                } else {
                    errorSet.push(question);
                }
            } else {
                var dataModel = {
                    type: question['Question Type'],
                    question: question['Question'],
                    answer: question['Answer'],
                    complexity: question['Complexity'],
                    options: [question['Option 1'], question['Option 2'], question['Option 3'], question['Option 4']],
                    tags: question['Tags'].split(","),
                    createdOn: d.getTime(),
                    updatedOn: d.getTime(),
                    status: 'ACTIVE'
                };
                console.log(dataModel);
                filteredSet.push(dataModel);
            }
        } else {
            errorSet.push(question);
        }
    }
    console.log('Correct', filteredSet);
    console.log('Wrong', errorSet);
    Models.QuestionModel.insertMany(filteredSet, function (err, data) {
        console.log(err, data)
        if (err) {
            res.status(500).json({
                message: "An error occured while bulk creating question."
            });
        }
        try {
            fs.unlinkSync(`uploads//${filename}`);
            console.log(`Fiel removed : uploads//${filename}`);
        } catch (err) {
            console.error(err)
        }
        res.json({
            message: "Questions created.",
            createdCount: filteredSet.length,
            errorCount: errorSet.length,
            error: errorSet
        });
    });
}

function isValidEntry(question) {
    var isValid = false;
    if (question['Question Type'] && question['Question'] && question['Answer'] && question['Complexity'] && question['Tags']) {
        if (question['Question Type'] == 'mcqs' || question['Question Type'] == 'mcqm' || question['Question Type'] == 'fixed' || question['Question Type'] == 'subjective') {
            if (question['Complexity'] == 'low' || question['Complexity'] == 'moderate' || question['Complexity'] == 'difficult' || question['Complexity'] == 'expert') {
                if (question['Question'].trim().length > 0 && question['Answer'].trim().length > 0) {
                    isValid = true;
                }
            }
        }
    }
    return isValid;
}