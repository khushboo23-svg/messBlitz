const mongoose = require("mongoose")

const schemaBill = new mongoose.Schema({
    image_url: {
        type: String,
        // required: true
    },
    date:{
        type: Date,
        //required: true
    },
    amount:{
        type: Number,
        required: true
    }
});

const BillSchema = mongoose.model('billSchema',schemaBill);

module.exports = BillSchema