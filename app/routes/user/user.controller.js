//@ts-check
const Models = require("../../models");


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
        Models.AdminModel.findOne({
            email: req.body.email,
            password: req.body.password,
            status: 'ACTIVE'
        }, function (err, data) {
            console.log(err, data);
            if (err) {
                res.status(500).json({
                    message: "Internal server error."
                });
            } else {
                if (data) {
                    const userData = JSON.parse(JSON.stringify(data));
                    req.session.user = {
                        id: userData._id,
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone
                    };
                    // console.log(req.session.user, req.cookies.user_sid);
                    res.json({ message: 'Valid user'});
                    // res.redirect('/admin/dashboard');
                } else {
                    res.status(500).json({
                        message: "Invalid credentials"
                    });
                }
            }
        });
    });

    app.get("/admin/register", (req, res) => {
        const data = {};
        res.renderVue("user/register.vue", data, req.vueOptions);
    });

    app.post("/admin/register", (req, res) => {
        //TODO Admin key check for env
        // if (req.body.adminKey == Buffer.from('xyz', 'base64').toString()) {
        if (req.body.adminKey == (process.env.APPLICATION_KEY || 'xyz')) {
            Models.AdminModel.findOne({
                email: req.body.email,
                status: 'ACTIVE'
            }, function (err, data) {
                console.log(err, data);
                if (err) {
                    res.status(500).json({
                        message: "Internal server error."
                    });
                } else {
                    if (data) {
                        res.status(500).json({
                            message: "User exists."
                        });
                    } else {
                        var d = new Date();
                        var dataModel = req.body;
                        dataModel['createdOn'] = d.getTime();
                        dataModel['updatedOn'] = d.getTime();
                        dataModel['status'] = 'ACTIVE';
                        delete dataModel['adminKey'];
                        Models.AdminModel.create(dataModel, function (err, data) {
                            console.log(err, data)
                            if (err) {
                                res.status(500).json({
                                    message: "An error occured while creating user."
                                });
                            }
                            res.json({
                                message: "User created."
                            });
                        });
                    }
                }
            });
        } else {
            res.status(500).json({
                message: "Invalid admin key."
            });
        }
    });

    app.get("/admin/logout", (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({
                    message: "Failed to logout user."
                });
            }
            res.redirect('/admin');
        });
    });
};