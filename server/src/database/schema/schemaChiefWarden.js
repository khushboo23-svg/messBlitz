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
        type: String,
        required: false
    },
    recoveryEmail: {
        type: String,
        required: true
    }
}, {timestamps: true})

const ChiefWardenSchema = mongoose.model('chiefWardenSchema',schemaChiefWarden);

module.exports = ChiefWardenSchema