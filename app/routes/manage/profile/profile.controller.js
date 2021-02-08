//@ts-check
const Models = require("../../../models");

module.exports = (app, db) => {
    app.get("/admin/profile", (req, res) => {
        if (req.session.user) {
            const data = {
                user: {
                    name: req.session.user.name,
                    email: req.session.user.email,
                    phone: req.session.user.phone,
                },
                updateDeatils: {
                    name: req.session.user.name,
                    email: req.session.user.email,
                    phone: req.session.user.phone,
                },
                updatePassword: {}
            };
            res.renderVue("manage/profile/profile.vue", data, req.vueOptions);
        } else {
            return res.redirect('/admin');
        }
    });

    app.post("/admin/profile", (req, res) => {
        if (req.session.user) {
            var d = new Date();
            var dataModel = req.body;
            dataModel['updatedOn'] = d.getTime();
            Models.AdminModel.findByIdAndUpdate(req.session.user.id, dataModel, function (err, data) {
                console.log(err, data)
                if (err) {
                    res.status(500).json({
                        message: "An error occured while updating profile."
                    });
                }
                req.session.user.name = req.body.name;
                req.session.user.phone = req.body.phone;
                res.json({
                    message: "Profile updated."
                });
            });
        } else {
            return res.redirect('/admin');
        }
    });

    app.post("/admin/password", (req, res) => {
        console.log('inside', req.session.user)
        if (req.session.user) {
            var d = new Date();
            var dataModel = req.body;
            dataModel['updatedOn'] = d.getTime();
            Models.AdminModel.findByIdAndUpdate(req.session.user.id, dataModel, function (err, data) {
                console.log(err, data)
                if (err) {
                    res.status(500).json({
                        message: "An error occured while updating password."
                    });
                }
                res.json({
                    message: "Password updated."
                });
            });
        } else {
            return res.redirect('/admin');
        }
    });
};