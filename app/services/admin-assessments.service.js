const Models = require("../models");

var questions = [];
var reviewRequired = false;

function assessmentCreate(req, callback) {
    var d = new Date();
    var dataModel = req.body;
    dataModel['createdOn'] = d.getTime();
    dataModel['updatedOn'] = d.getTime();
    dataModel['assessmentCode'] = makeAssessmentId(10);
    dataModel['status'] = 'ACTIVE';
    dataModel['assessmentStatus'] = 'PENDING';
    questions = [];
    reviewRequired = false;
    populateQuestions(dataModel.details, 0);
    dataModel['questions'] = questions;
    dataModel['reviewRequired'] = reviewRequired;
    console.log(dataModel);
    Models.AssessmentModel.findOne({
        email: req.body.email,
        status: 'ACTIVE',
        assessmentStatus: 'PENDING'
    }, (err, data) => {
        if (err) {
            callback({
                message: "Internal server error."
            }, null);
        } else {
            if (data) {
                callback({
                    message: "Assessment exists."
                }, null);
            } else {
                Models.AssessmentModel.create(dataModel, function (err, data) {
                    console.log(err, data)
                    if (err) {
                        callback({
                            message: "An error occured while creating assessment."
                        }, null);
                    }
                    callback(null, {
                        message: "Assessment created."
                    });
                });
            }
        }
    });
}

function assessmentUpdate(req, callback) {
    var d = new Date();
    var dataModel = req.body;
    dataModel['updatedOn'] = d.getTime();
    dataModel['assessmentStatus'] = 'PENDING';
    questions = [];
    reviewRequired = false;
    populateQuestions(dataModel.details, 0);
    dataModel['questions'] = questions;
    dataModel['reviewRequired'] = reviewRequired;
    Models.AssessmentModel.findByIdAndUpdate(req.params.id, dataModel, (err, data) => {
        console.log(err, data)
        if (err) {
            callback({
                message: "An error occured while updating assessment."
            }, null);
        }
        callback(null, {
            message: "Assessment updated."
        });
    });
}

function assessmentRemove(req, callback) {
    Models.AssessmentModel.findByIdAndRemove(req.params.id, (err, data) => {
        console.log(err, data)
        if (err) {
            callback({
                message: "An error occured while deleting assessment."
            }, null);
        }
        callback(null, {
            message: "Assessment deleted."
        });
    });
}

function makeAssessmentId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function populateQuestions(assessmentDetails, count) {
    console.log(assessmentDetails.length, count);
    if (count < assessmentDetails.length) {
        const detail = assessmentDetails[count];
        console.log(detail);
        Models.QuestionModel.aggregate([{
            $sample: {
                size: Number(detail.count)
            }
        },
        {
            $match: {
                complexity: detail.complexity,
                tags: {
                    $all: detail.tag.split(',')
                },
                status: 'ACTIVE'
            }
        }
        ]).exec((err, data) => {
            console.log(err, data)
            for (const q of JSON.parse(JSON.stringify(data))) {
                questions.push({
                    questionId: q._id,
                    type: q.type,
                    attempted: false,
                    userAnswer: '',
                    isCorrect: false
                });
                if (q.type == 'subjective') {
                    reviewRequired = true;
                }
            }
            populateQuestions(assessmentDetails, ++count);
        });
    }
}

module.exports = {
    assessmentCreate: assessmentCreate,
    assessmentUpdate: assessmentUpdate,
    assessmentRemove: assessmentRemove
}