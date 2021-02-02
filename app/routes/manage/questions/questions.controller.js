//@ts-check

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = (router) => {
    router.get("/admin/questions", (req, res) => {
            const data = {
                title: "Parīkṣā",
                questions: [{
                        id: 1,
                        type: "mcq",
                        tags: ["z"],
                        question: "test"
                    },
                    {
                        id: 2,
                        type: "mcq",
                        tags: ["z"],
                        question: "test"
                    },
                    {
                        id: 3,
                        type: "mcq",
                        tags: ["z"],
                        question: "test"
                    }
                ]
            };
            addVueOptions(req);
            res.renderVue("manage/questions/questions.vue", data, req.vueOptions);
        },
    );

    router.get("/admin/question/create", (req, res) => {
            const data = {
                title: "Parīkṣā",
                data: {
                    id: 1,
                    type: "mcq",
                    tags: ["z"],
                    question: "test"
                }
            };
            addVueOptions(req);
            res.renderVue("manage/questions/edit-question.vue", data, req.vueOptions);
        },
    );

    router.get("/admin/question/:id/edit", (req, res) => {
            const data = {
                title: "Parīkṣā",
                data: {
                    id: 1,
                    type: "mcq",
                    tags: ["z"],
                    question: "test"
                }
            };
            addVueOptions(req);
            res.renderVue("manage/questions/edit-question.vue", data, req.vueOptions);
        },
    );

    router.get("/admin/question/:id", (req, res) => {
            const data = {
                title: "Parīkṣā",
                data: {
                    id: 1,
                    type: "mcq",
                    tags: ["z"],
                    question: "test"
                }
            };
            addVueOptions(req);
            res.renderVue("manage/questions/view-question.vue", data, req.vueOptions);
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
    });
}