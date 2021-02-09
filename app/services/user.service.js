//@ts-check

const Models = require("../models");

function userLogin(req, callback) {
    Models.AdminModel.findOne({
        email: req.body.email,
        password: req.body.password,
        status: 'ACTIVE'
    }, function (err, data) {
        console.log(err, data);
        if (err) {
            callback({
                message: "Internal server error."
            }, null);
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
                callback(null, {
                    message: 'Valid user'
                });
            } else {
                callback({
                    message: "Invalid credentials."
                }, null);
            }
        }
    });
}

function createUser(req, callback) {
    //TODO Admin key check for env
    // if (req.body.adminKey == Buffer.from('xyz', 'base64').toString()) {
    if (req.body.adminKey == (process.env.APPLICATION_KEY || 'xyz')) {
        Models.AdminModel.findOne({
            email: req.body.email,
            status: 'ACTIVE'
        }, function (err, data) {
            console.log(err, data);
            if (err) {
                callback({ message: "Internal server error." }, null);
            } else {
                if (data) {
                    callback({ message: "User exists." }, null);
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
                            callback({ message: "An error occured while creating user." }, null);
                        }
                        callback(null, { message: "User created." });
                    });
                }
            }
        });
    } else {
        callback({ message: "Invalid admin key." }, null);
    }
}

module.exports = {
    userLogin: userLogin,
    createUser: createUser
}