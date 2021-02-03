//@ts-check
const Models = require("../../models");


module.exports = (router, db) => {
    router.get("/admin", (req, res) => {
        const data = {};
        addVueOptions(req);
        res.renderVue("user/login.vue", data, req.vueOptions);
    });

    router.post("/admin/login", (req, res) => {
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
                    res.json({
                        message: "User found."
                    });
                } else {
                    res.status(500).json({
                        message: "Invalid credentials"
                    });
                }
            }
        });
    });

    router.get("/admin/register", (req, res) => {
        const data = {};
        addVueOptions(req);
        res.renderVue("user/register.vue", data, req.vueOptions);
    });

    router.post("/admin/register", (req, res) => {
        //TODO Admin key check for env
        // if (req.body.adminKey == Buffer.from('xyz', 'base64').toString()) {
        if (req.body.adminKey == 'xyz') {
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
};

function addVueOptions(req) {
    req.vueOptions.head.title = "Parīkṣā";
    req.vueOptions.head.metas.push({
        name: "viewport",
        content: "width=device-width,initial-scale=1"
    }, {
        charset: "utf-8"
    });
    req.vueOptions.head.styles.push({
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
        rel: "stylesheet",
        integrity: "sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1",
        crossorigin: "anonymous"
    }, {
        src: "../../assets/external/notiflix-2.6.0.min.css",
        rel: "stylesheet"
    });
    req.vueOptions.head.scripts.push({
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
        integrity: "sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW",
        crossorigin: "anonymous"
    }, {
        src: "https://unpkg.com/axios/dist/axios.min.js",
    }, {
        src: "../../assets/external/notiflix-2.6.0.min.js",
    }, {
        src: "../../assets/external/notiflix-aio-2.6.0.min.js",
    });
}