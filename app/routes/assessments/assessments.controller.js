//@ts-check

/**
 * Post Route Controller
 * @param {object} router
 */
module.exports = (router) => {
    router.get("/",
        /**
         * @param {object} req
         * @param {object} res
         */
        (req, res) => {
            const data = {
                message: "Parīkṣā",
            };
            addVueOptions(req)
            res.renderVue("assessments/register.vue", data, req.vueOptions);
        },
    );

    router.post("/assessment/start",
        /**
         * @param {object} req
         * @param {object} res
         */
        (req, res) => {
            const data = {
                message: "POST",
                body: req.body,
            };
            res.json(data);
        },
    );

    router.get("/assessment/:id",
        /**
         * @param {object} req
         * @param {object} res
         */
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
            addVueOptions(req)
            res.renderVue("assessments/assessment.vue", data, req.vueOptions);
        },
    );

    router.post("/assessment/:id",
        /**
         * @param {object} req
         * @param {object} res
         */
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

    router.get("/assessment/:id/complete",
        /**
         * @param {object} req
         * @param {object} res
         */
        (req, res) => {
            const data = {
                message: "Parīkṣā",
            };
            addVueOptions(req)
            res.renderVue("assessments/complete.vue", data, req.vueOptions);
        },
    );

};

function addVueOptions(req) {
    req.vueOptions.head.title = "Parīkṣā";
    req.vueOptions.head.styles.push({
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
        rel: "stylesheet",
        integrity: "sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1",
        crossorigin: "anonymous"
    });
    req.vueOptions.head.scripts.push({
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
        integrity: "sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW", 
        crossorigin: "anonymous"
    },
    {
        src: "https://unpkg.com/axios/dist/axios.min.js",
    });
}
