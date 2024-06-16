const mongoose = require("mongoose")

const schemaPayment = new mongoose.Schema({
  amount:{
    type:Number,
    required:true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: 'studentSchema'
  }
}, {timestamps: true});
const paymentSchema = mongoose.model('paymentSchema',schemaPayment);

module.exports = paymentSchema;