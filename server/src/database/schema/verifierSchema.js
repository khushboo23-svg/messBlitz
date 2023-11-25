const mongoose = require("mongoose")

const verifierSchema = new mongoose.Schema({
    
    id : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    OTP : {
        type: Number,
        required: true
    }
}, {timestamps: true})
const VerifierSchema = mongoose.model('verifierSchema',verifierSchema);

module.exports = VerifierSchema