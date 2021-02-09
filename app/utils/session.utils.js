//@ts-check

function checkValidAdminSession(req, res, next) {
    if(req.session.user) {
        next();
    } else {
        return res.redirect('/admin');
    }
}

module.exports = {
    checkValidAdminSession: checkValidAdminSession
}