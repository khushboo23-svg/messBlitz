const mongoose = require("mongoose")

const hostelSchema = mongoose.Schema({
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
        of: String,
        required:false
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
    hostelName: {
        type: String,
        required: true
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