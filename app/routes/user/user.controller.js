//@ts-check
const Models = require("../../models");
const Services = require('../../services');

module.exports = (app, db) => {
    app.get("/admin", (req, res) => {
        const data = {};
        if (req.session.user) {
            res.redirect('/admin/dashboard');
        } else {
            res.renderVue("user/login.vue", data, req.vueOptions);
        }
    });

    app.post("/admin/login", (req, res) => {
        Services.UserService.userLogin(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(data);
        });
    });

    app.get("/admin/register", (req, res) => {
        const data = {};
        res.renderVue("user/register.vue", data, req.vueOptions);
    });

    app.post("/admin/register", (req, res) => {
        Services.UserService.createUser(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(data);
        });
    });

    app.get("/admin/logout", (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({
                    message: "Failed to logout user."
                });
            }
            res.json({ message: 'logged out'});
        });
    });
};