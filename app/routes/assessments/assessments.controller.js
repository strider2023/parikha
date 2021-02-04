//@ts-check

module.exports = (app, db) => {
    app.get("/",
        (req, res) => {
            const data = {
                message: "Parīkṣā",
            };
            res.renderVue("assessments/register.vue", data, req.vueOptions);
        },
    );

    app.post("/assessment/start",
        (req, res) => {
            const data = {
                message: "POST",
                body: req.body,
            };
            res.json(data);
        },
    );

    app.get("/assessment/:id",
        (req, res) => {
            const data = {
                title: "Parīkṣā",
                questions: [{id:1, question: "Test 1123"}],
                assessment: {
                    id: 'asdsad',
                    question: "This is a test question.",
                    type: 'mcqm',
                    options: [
                        {
                            id: '1',
                            value: 'Test 1'
                        },
                        {
                            id: '2',
                            value: 'Test 2'
                        },
                        {
                            id: '3',
                            value: 'Test 3'
                        },
                        {
                            id: '4',
                            value: 'Test 4'
                        }
                    ]
                }
            };
            res.renderVue("assessments/assessment.vue", data, req.vueOptions);
        },
    );

    app.post("/assessment/:id",
        (req, res) => {
            const data = {
                title: "Parīkṣā",
                questions: [{id:1, question: "Test 1123"}],
                assessment: {
                    id: 'asdsad',
                    question: "This is a test question.",
                    type: 'mcqs',
                    options: [
                        {
                            id: '1',
                            value: 'Test 1'
                        },
                        {
                            id: '2',
                            value: 'Test 2'
                        },
                        {
                            id: '3',
                            value: 'Test 3'
                        },
                        {
                            id: '4',
                            value: 'Test 4'
                        }
                    ]
                }
            };
            res.json(data);
        },
    );

    app.get("/assessment/:id/complete",
        (req, res) => {
            const data = {
                message: "Parīkṣā",
            };
            res.renderVue("assessments/complete.vue", data, req.vueOptions);
        },
    );

};
