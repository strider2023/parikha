//@ts-check

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = (router) => {
    router.get("/admin/dashboard",
        /**
         * @param {object} req
         * @param {object} res
         */
        (req, res) => {
            const data = {
                title: "Parīkṣā",
            };
            addVueOptions(req);
            res.renderVue("dashboard/main.vue", data, req.vueOptions);
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
