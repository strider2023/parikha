//@ts-check

const Utils = require('../../utils');

module.exports = (app, db) => {
    app.get("/admin/dashboard", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
        const data = {};
        res.renderVue("dashboard/main.vue", data, req.vueOptions);
    });
};