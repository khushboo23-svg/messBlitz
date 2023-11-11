const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    typeOf: {
        type: String,
        required: true
    },
    hostel: [{
        type: String,
        required: false
    }],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamp: true})

const AdminSchema = mongoose.model('adminSchema',adminSchema);

module.exports = AdminSchema