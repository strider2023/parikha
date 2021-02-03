// @ts-check

const mongo = require('mongoose');

const appDataSchema = new mongo.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    status: String,
    createdOn: Number,
    updatedOn: Number
}, { strict: false });

module.exports = mongo.model('admin', appDataSchema);
