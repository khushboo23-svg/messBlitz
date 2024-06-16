
const mongoose = require("mongoose")

const schemaFeedback = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        ref: 'studentSchema',
        // required: true
    },
    rating: {
        type:[Number],
        required:true,
        // type: Array,
        // of: mongoose.Types.ObjectId
    },
    date: {
        type: Date,
        required: true
    }
})

const FeedbackSchema = mongoose.model('feedbackSchema', schemaFeedback)

module.exports = FeedbackSchema