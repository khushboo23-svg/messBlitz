const mongoose = require("mongoose")

const schemaAccountant = new mongoose.Schema({
    hostelName: {
        type: String,
        required: true
    },
    workerType: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    noOfWorkers: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const AccountantSchema = mongoose.model('accountantSchema',schemaAccountant);

module.exports = AccountantSchema