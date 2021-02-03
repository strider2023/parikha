// @ts-check

const mongo = require('mongoose');

const appDataSchema = new mongo.Schema({
    type: String,
    question: String,
    answer: String,
    options: [String],
    tags: [String],
    status: String,
    createdOn: Number,
    updatedOn: Number
}, { strict: false });

module.exports = mongo.model('question', appDataSchema);
