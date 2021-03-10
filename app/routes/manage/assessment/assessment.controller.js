//@ts-check
const Models = require("../../../models");
const Utils = require('../../../utils');

const Services = require('../../../services');

var questions = [];
var reviewRequired = false;

module.exports = (app, db) => {
    app.get("/admin/assessments", Utils.SessionUtils.checkValidAdminSession, (req, res) => {
        Services.AdminAssessments.fetchAssessments(req, (err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            data['tableConfig'] = {
                headers: ['Name', 'Email Id', 'Assessment Code', 'Status'],
                keys: ['name', 'email', 'assessmentCode', 'assessmentStatus'],
                optionsBaseURL: '/admin/assessment/',
                paginationBaseURL: '/admin/assessments'
            }
            res.renderVue("manage/assessment/assessment.vue", data, req.vueOptions);
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

