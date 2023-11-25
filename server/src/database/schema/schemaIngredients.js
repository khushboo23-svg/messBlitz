const mongoose = require("mongoose")

const schemaIngredient = new mongoose.Schema({
    hostelName: {
        type: String,
        required: true
    },
    ingredientName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const IngredientSchema = mongoose.model('ingredientSchema',schemaAccountant);

module.exports = AccountantSchema