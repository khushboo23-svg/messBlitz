const mongoose = require("mongoose")

const hostelSchema = new monggose.Schema({
    name: {
        type: String,
        required: true
    },
    noOfStudents: {
        type: Number,
        required: true
    },
    messMenu: {
        type: Buffer,
        of: String
    },
    wardens:[{
        type: mongoose.Schema.ObjectId,
        ref: 'admin'
    }]

},{timestamp: true})

const HostelSchema = mongoose.model('hostelSchema',hostelSchema)

module.exports = HostelSchema