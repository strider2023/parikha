//@ts-check
const Models = require("../../../models");

module.exports = (app, db) => {
    app.get("/admin/assessments", (req, res) => {
        if (req.session.user) {
            let modelData = {
                assessments: []
            };
            Models.AssessmentModel.find({
                status: 'ACTIVE'
            }, "name email assessmentCode assessmentStatus", function (err, data) {
                console.log(err, data);
                if (err) {

                }
                modelData.assessments = JSON.parse(JSON.stringify(data));
                res.renderVue("manage/assessment/assessment.vue", modelData, req.vueOptions);
            });
        } else {
            return res.redirect('/admin');
        }
    });

    app.get("/admin/assessment/:id", (req, res) => {
        const data = {
            title: "Parīkṣā",
            data: {
                id: 1,
                name: "Arindam Nath",
                email: "strider2023@gmail.com",
                code: "REACT-1233",
                status: "Pending Evaluation"
            }
        };
        res.renderVue("manage/assessment/view-assessment.vue", data, req.vueOptions);
    });

    app.get("/admin/create/assessment", (req, res) => {
        if (req.session.user) {
            const modelData = {
                buttonLabel: "Create"
            };
            res.renderVue("manage/assessment/edit-assessment.vue", modelData, req.vueOptions);
        } else {
            return res.redirect('/admin');
        }
    });

    app.get("/admin/assessment/:id/edit", (req, res) => {
        const data = {
            buttonLabel: "Update"
        };
        res.renderVue("manage/assessment/edit-assessment.vue", data, req.vueOptions);
    });
};