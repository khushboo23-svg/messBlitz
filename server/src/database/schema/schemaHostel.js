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
        required: String
    },
    warden:{
        type: String,
        required: true
    },
    expense:{
        type: Number,
        // required: true
    }

},{timestamps: true})

const HostelSchema = mongoose.model('hostelSchema',hostelSchema)

module.exports = HostelSchema