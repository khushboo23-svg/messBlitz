const mongoose = require("mongoose")

const hostelSchema = new mongoose.Schema({
    hostelName: {
        type: String,
        required: true
    },
    noOfStudents: {
        type: Number,
        required: true
    },
    messMenu: {
        type: Buffer,
        of: String,
        required: false
    },
    warden:{
        type: String,
        required: true
    }

},{timestamp: true})

const HostelSchema = mongoose.model('hostelSchema',hostelSchema)

module.exports = HostelSchema