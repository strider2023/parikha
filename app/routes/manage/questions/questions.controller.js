//@ts-check

const Models = require("../../../models");

module.exports = (router) => {
    router.get("/admin/questions", (req, res) => {
            let modelData = {
                questions: []
            };
            addVueOptions(req);
            Models.QuestionModel.find({status: 'ACTIVE'}, function (err, data) {
                console.log(err, data);
                if (err) {
                    
                }
                modelData.questions = JSON.parse(JSON.stringify(data));
                res.renderVue("manage/questions/questions.vue", modelData, req.vueOptions);
            });
        },
    );

    router.get("/admin/question/create", (req, res) => {
            const data = {
                buttonLabel: "Create"
            };
            addVueOptions(req);
            res.renderVue("manage/questions/edit-question.vue", data, req.vueOptions);
        },
    );

    router.post("/admin/question", (req, res) => {
        var d = new Date();
        var dataModel = { 
            type: req.body.type,
            question: req.body.question,
            answer: req.body.answer,
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

    router.get("/admin/question/:id/edit", (req, res) => {
            const modelData = {
                buttonLabel: "Update",
                question: {}
            };
            addVueOptions(req);
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
                        tags: question.tags.toString(),
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: ''
                    };
                }
                res.renderVue("manage/questions/edit-question.vue", modelData, req.vueOptions);
            });
        },
    );

    router.post("/admin/question/:id", (req, res) => {
        // console.log(req.body);
        var d = new Date();
        var dataModel = { 
            type: req.body.type,
            question: req.body.question,
            answer: req.body.answer,
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

    router.get("/admin/question/:id", (req, res) => {
            const modelData = {
                question: {}
            };
            addVueOptions(req);
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
                        tags: question.tags.toString(),
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: ''
                    };
                }
                res.renderVue("manage/questions/view-question.vue", modelData, req.vueOptions);
            });
        },
    );
};

function addVueOptions(req) {
    req.vueOptions.head.title = "Parīkṣā";
    req.vueOptions.head.metas.push({
        name: "viewport",
        content: "width=device-width,initial-scale=1"
    }, {
        charset: "utf-8"
    });
    req.vueOptions.head.styles.push({
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
        rel: "stylesheet",
        integrity: "sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1",
        crossorigin: "anonymous"
    }, {
        src: "../../../assets/external/notiflix-2.6.0.min.css",
        rel: "stylesheet"
    });
    req.vueOptions.head.scripts.push({
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
        integrity: "sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW",
        crossorigin: "anonymous"
    }, {
        src: "https://unpkg.com/axios/dist/axios.min.js",
    }, {
        src: "../../../assets/external/notiflix-2.6.0.min.js",
    }, {
        src: "../../../assets/external/notiflix-aio-2.6.0.min.js",
    });
}