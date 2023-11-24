const mongoose = require("mongoose")

const wardenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hostelName: {
        type: String,
        required: false
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

const WardenSchema = mongoose.model('wardenSchema',wardenSchema);

module.exports = WardenSchema