const mongoose = require("mongoose")

const schemaChiefWarden = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: Buffer,
        of: String,
        required: false
    },
    recoveryEmail: {
        type: String,
        required: true
    }
}, {timestamp: true})

const ChiefWardenSchema = mongoose.model('schemaChiefWarden',schemaChiefWarden);

module.exports = ChiefWardenSchema