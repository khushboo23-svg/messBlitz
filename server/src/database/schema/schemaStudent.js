const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true
    },
    hostelName: {
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
    recoveryEmail: {
        type: String,
        required: true
    },
    roomNo: {
        type: Number,
        required: false
    },
    profileImg: {
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        required: true
    },
    feePaid: {
        type: Boolean,
        required: false
    },
    feeAmount: {
        type: Number,
        required: false
    }
}, {timestamps: true})

const StudentSchema = mongoose.model('studentSchema', studentSchema)

module.exports = StudentSchema