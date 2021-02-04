// @ts-check

const mongo = require('mongoose');

const appDataSchema = new mongo.Schema({
    name: String,
    email: String,
    assessmentCode: String,
    time: Number,
    assessmentStart: Date,
    assessmentExpiry: Date,
    start: Date,
    end: Date,
    totalQuestions: Number,
    totalAttempted: Number,
    totalCorrect: Number,
    totalWrong: Number,
    score: Number,
    assessmentStatus: String,
    details: [
        {
            tag: String,
            complexity: String,
            count: Number
        }
    ],
    questions: [
        {
            questionId: String,
            attempted: Boolean,
            userAnsewer: String,
            isCorrect: Boolean
        }
    ],
    status: String,
    createdOn: Number,
    updatedOn: Number
}, { strict: false });

module.exports = mongo.model('assessment', appDataSchema);
