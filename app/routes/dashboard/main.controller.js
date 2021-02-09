//@ts-check

const Utils = require('../../utils');

module.exports = (app, db) => {
    app.get("/admin/dashboard", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
            const data = {};
            // console.log(req.session.user, req.cookies.user_sid);
            // if(req.session.user.id) {
                res.renderVue("dashboard/main.vue", data, req.vueOptions);
            // } else {
            //     return res.redirect('/admin');
            // }
        });
};