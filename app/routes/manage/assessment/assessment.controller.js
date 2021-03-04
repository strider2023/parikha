//@ts-check
const Models = require("../../../models");
const Utils = require('../../../utils');

const Services = require('../../../services');

var questions = [];
var reviewRequired = false;

module.exports = (app, db) => {
    app.get("/admin/assessments", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
        let page = req.query.page || 1;
        let count = req.query.count || 10;
        let from = req.query.from || null;
        let to = req.query.to || null;
        let status = req.query.status || null;
        let modelData = {
            total: 0,
            assessments: [],
            currentPage: page
        };
        Models.AssessmentModel.find({
            status: 'ACTIVE'
        }, "type question tags complexity", function (err, data) {
            // console.log(err, data);
            modelData.total = JSON.parse(JSON.stringify(data)).length;

            Models.AssessmentModel.find({
                status: 'ACTIVE'
            }, "name email assessmentCode assessmentStatus", { skip: ((page - 1) * count), limit: parseInt(count) }, function (err, data) {
                console.log(err, data);
                if (err) {

                }
                modelData.assessments = JSON.parse(JSON.stringify(data));
                res.renderVue("manage/assessment/assessment.vue", modelData, req.vueOptions);
            });
        });
    });

    app.get("/admin/assessment/:id", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
        const modelData = {
            assessment: {}
        };
        Models.AssessmentModel.findById(req.params.id, (err, data) => {
            if (err) {

            }
            modelData.assessment = JSON.parse(JSON.stringify(data));
            res.renderVue("manage/assessment/view-assessment.vue", modelData, req.vueOptions);
        });
    });

    app.get("/admin/create/assessment", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
        const modelData = {
            buttonLabel: "Create"
        };
        res.renderVue("manage/assessment/edit-assessment.vue", modelData, req.vueOptions);
    });

    app.get("/admin/assessment/:id/edit", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
        const modelData = {
            buttonLabel: "Update",
            assessment: {}
        };
        Models.AssessmentModel.findById(req.params.id, (err, data) => {
            if (err) {

            }
            modelData.assessment = JSON.parse(JSON.stringify(data));
            res.renderVue("manage/assessment/edit-assessment.vue", modelData, req.vueOptions);
        });
    });

    app.post("/admin/assessment", (req, res) => {
        Services.AdminAssessments.assessmentCreate(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(data);
        });
    });

    app.post("/admin/assessment/:id", (req, res) => {
        Services.AdminAssessments.assessmentUpdate(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(data);
        });
    });

    app.delete("/admin/assessment/:id", (req, res) => {
        Services.AdminAssessments.assessmentRemove(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            res.json(data);
        });
    });
};

