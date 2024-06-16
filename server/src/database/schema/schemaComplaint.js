const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    proofImg: {
        type: String
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
        ref: 'studentSchema',
        required: true
    },
    hostelName: {
        type: String,
        required: true
    },
    comments: [{
        type: new mongoose.Schema({
            comment: {
                type: String,
                required: true
            },
            writtenBy: {
                // type: mongoose.Types.ObjectId,
                type:String,
                // ref: 'studentSchema'
                required:true,
            },
            likedBy: [{
                type: mongoose.Types.ObjectId,
                ref: 'studentSchema'
            }]
        },{timestamps: true})}]
    
}, {timestamps: true})

const ComplaintSchema = mongoose.model('complaintSchema', complaintSchema)

module.exports = ComplaintSchema