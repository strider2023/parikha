//@ts-check

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = (router) => {
    router.get("/admin/assessments", (req, res) => {
            const data = {
                title: "Parīkṣā",
                data: [{
                    id: 1,
                    name: "Arindam Nath",
                    email: "strider2023@gmail.com",
                    code: "REACT-1233",
                    status: "Pending Evaluation"
                }]
            };
            addVueOptions(req);
            res.renderVue("manage/assessment/assessment.vue", data, req.vueOptions);
        },
    );

    router.get("/admin/assessment/:id", (req, res) => {
            const data = {
                title: "Parīkṣā",
                data: {
                    id: 1,
                    name: "Arindam Nath",
                    email: "strider2023@gmail.com",
                    code: "REACT-1233",
                    status: "Pending Evaluation"
                }
            };
            addVueOptions(req);
            res.renderVue("manage/assessment/view-assessment.vue", data, req.vueOptions);
        },
    );

    router.get("/admin/assessment/create", (req, res) => {
            const data = {
                title: "Parīkṣā",
                data: {
                    id: 1,
                    name: "Arindam Nath",
                    email: "strider2023@gmail.com",
                    code: "REACT-1233",
                    status: "Pending Evaluation"
                }
            };
            addVueOptions(req);
            res.renderVue("manage/assessment/edit-assessment.vue", data, req.vueOptions);
        },
    );

    router.get("/admin/assessment/:id/edit", (req, res) => {
            const data = {
                title: "Parīkṣā",
                data: {
                    id: 1,
                    name: "Arindam Nath",
                    email: "strider2023@gmail.com",
                    code: "REACT-1233",
                    status: "Pending Evaluation"
                }
            };
            addVueOptions(req);
            res.renderVue("manage/assessment/edit-assessment.vue", data, req.vueOptions);
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