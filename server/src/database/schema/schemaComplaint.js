const mongoose = require("mongoose")

const hostelSchema = monggose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    proofImg: {
        type: Buffer,
        of: String
    },
    upvoteId: {
        type: Array,
        of: mongoose.Types.ObjectId
    },
    downvoteId: {
        type: Array,
        of: mongoose.Types.ObjectId
    },
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: 'studentSchema'
    },
    hostelId: {
        type: mongoose.Types.ObjectId,
        ref:'hostelSchema'
    },
    comment: [{
        type: new mongoose.Schema({
            text: {
                type: String,
                required: true
            },
            writtenBy: {
                type: mongoose.Types.ObjectId,
                ref: 'studentSchema'
            },
            likedBy: [{
                type: mongoose.Types.ObjectId,
                ref: 'studentSchema'
            }]
        },{timestamp: true})}]
    
}, {timestamp: true})

const ComplaintSchema = mongoose.model('complaintSchema', complaintSchema)

module.exports = ComplaintSchema