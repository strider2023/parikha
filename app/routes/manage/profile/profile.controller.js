//@ts-check

module.exports = (app) => {
    app.get("/admin/profile", (req, res) => {
            if(req.session.user) {
                const data = {
                    user: {
                        name: req.session.user.name,
                        email: req.session.user.email,
                        phone: req.session.user.phone,
                    }
                };
                res.renderVue("manage/profile/profile.vue", data, req.vueOptions);
            } else {
                return res.redirect('/admin');
            }
        }
    );
};