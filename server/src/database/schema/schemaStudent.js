const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true
    },
    hostelId: {
        type: mongoose.Types.ObjectId,
        ref: 'hostelSchema'
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
    }
}, {timestamp: true})

const StudentSchema = mongoose.model('studentSchema', studentSchema)

module.exports = StudentSchema