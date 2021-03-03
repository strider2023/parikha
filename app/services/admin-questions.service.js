const Models = require("../models");
const fs = require("fs");

function createQuestion(req, callback) {
    var d = new Date();
    var dataModel = {
        type: req.body.type,
        question: req.body.question,
        answer: req.body.answer,
        complexity: req.body.complexity,
        options: [req.body.option1, req.body.option2, req.body.option3, req.body.option4],
        tags: req.body.tags.split(","),
        createdOn: d.getTime(),
        updatedOn: d.getTime(),
        status: 'ACTIVE'
    };
    console.log(dataModel);
    Models.QuestionModel.create(dataModel, function (err, data) {
        console.log(err, data)
        if (err) {
            callback({
                message: "An error occured while creating question."
            }, null);
        }
        callback(null, {
            message: "Question created."
        });
    });
}

function removeQuestion(req, callback) {
    Models.QuestionModel.findByIdAndRemove(req.params.id, function (err, data) {
        console.log(err, data)
        if (err) {
            callback({
                message: "An error occured while deleting question."
            }, null);
        }
        callback(null, {
            message: "Question deleted."
        });
    });
}

function updateQuestion(req, callback) {
    // console.log(req.body);
    var d = new Date();
    var dataModel = {
        type: req.body.type,
        question: req.body.question,
        answer: req.body.answer,
        complexity: req.body.complexity,
        options: [req.body.option1, req.body.option2, req.body.option3, req.body.option4],
        tags: req.body.tags.split(","),
        updatedOn: d.getTime(),
        status: 'ACTIVE'
    };
    console.log(dataModel);
    Models.QuestionModel.findByIdAndUpdate(req.params.id, dataModel, function (err, data) {
        console.log(err, data)
        if (err) {
            callback({
                message: "An error occured while updating question."
            }, null);
        }
        callback(null, {
            message: "Question updated."
        });
    });
}

function bulkUpload(filename, bulkData, req, callback) {
    console.log(bulkData);
    var filteredSet = [];
    var errorSet = [];
    var d = new Date();
    for (const question of bulkData) {
        if (isValidEntry(question)) {
            if (question['Question Type'] == 'mcqm' || question['Question Type'] == 'mcqs') {
                if (question['Option 1'].trim().length > 0 && question['Option 2'].trim().length > 0 && question['Option 3'].trim().length > 0 && question['Option 4'].trim().length > 0) {
                    var dataModel = {
                        type: question['Question Type'],
                        question: question['Question'],
                        answer: question['Answer'],
                        complexity: question['Complexity'],
                        options: [question['Option 1'], question['Option 2'], question['Option 3'], question['Option 4']],
                        tags: question['Tags'].split(","),
                        createdOn: d.getTime(),
                        updatedOn: d.getTime(),
                        status: 'ACTIVE'
                    };
                    console.log(dataModel);
                    filteredSet.push(dataModel);
                } else {
                    errorSet.push(question);
                }
            } else {
                var dataModel = {
                    type: question['Question Type'],
                    question: question['Question'],
                    answer: question['Answer'],
                    complexity: question['Complexity'],
                    options: [question['Option 1'], question['Option 2'], question['Option 3'], question['Option 4']],
                    tags: question['Tags'].split(","),
                    createdOn: d.getTime(),
                    updatedOn: d.getTime(),
                    status: 'ACTIVE'
                };
                console.log(dataModel);
                filteredSet.push(dataModel);
            }
        } else {
            errorSet.push(question);
        }
    }
    console.log('Correct', filteredSet);
    console.log('Wrong', errorSet);
    Models.QuestionModel.insertMany(filteredSet, function (err, data) {
        console.log(err, data)
        if (err) {
            callback({
                message: "An error occured while bulk creating question."
            }, null);
        }
        try {
            fs.unlinkSync(`uploads//${filename}`);
            console.log(`Fiel removed : uploads//${filename}`);
        } catch (err) {
            console.error(err)
        }
        callback(null, {
            message: "Questions created.",
            createdCount: filteredSet.length,
            errorCount: errorSet.length,
            error: errorSet
        });
    });
}

function isValidEntry(question) {
    var isValid = false;
    if (question['Question Type'] && question['Question'] && question['Answer'] && question['Complexity'] && question['Tags']) {
        if (question['Question Type'] == 'mcqs' || question['Question Type'] == 'mcqm' || question['Question Type'] == 'fixed' || question['Question Type'] == 'subjective') {
            if (question['Complexity'] == 'low' || question['Complexity'] == 'moderate' || question['Complexity'] == 'difficult' || question['Complexity'] == 'expert') {
                if (question['Question'].trim().length > 0 && question['Answer'].trim().length > 0) {
                    isValid = true;
                }
            }
        }
    }
    return isValid;
}

module.exports = {
    createQuestion: createQuestion,
    removeQuestion: removeQuestion,
    updateQuestion: updateQuestion,
    bulkUpload: bulkUpload
}