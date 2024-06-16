const Razorpay = require('razorpay');
const crypto = require('crypto');
const { addBillData } = require('../database/operations/paymentOp');
const { changeFeePaidstatus, updateFeeAmountPaid } = require('../database/operations/studentOp');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// console.log("Razorpay Key:", process.env.RAZORPAY_API_KEY);
// console.log("Razorpay Secret:", process.env.RAZORPAY_API_SECRET);
const getkey = (req, res) =>{
  // console.log(req.body);
  // console.log(process.env.RAZORPAY_API_KEY);
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
}

const checkout = async (req, res) => {
  console.log(req.body);
  try {
    const options = {
      amount: Number(req.body.amount * 100), // convert to paise
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error in creating order:', error);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
};



const paymentVerification = async (req, res) => {
  try {
    // console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,razorpay_amount } = req.body;
    
    const order = await instance.orders.fetch(razorpay_order_id);
    // console.log(order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    var generatedSignature = crypto
      .createHmac("SHA256", process.env.RAZORPAY_API_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex"); 

    const isAuthentic = generatedSignature === razorpay_signature;

    if (isAuthentic) {
      await addBillData({amount: (order.amount/100), razorpay_order_id:razorpay_order_id, razorpay_payment_id:razorpay_payment_id, razorpay_signature:razorpay_signature, studentId:req.sid});
      await changeFeePaidstatus(req.sid);
      await updateFeeAmountPaid({studentId: req.sid,amount: order.amount/100})
      res.send({status: 200, data:{payment_id: razorpay_payment_id, message: "Payment is success",amount: (order.amount/100)}});
    } else {
      res.status(401).json({ message: "Not Authenticated" });
    }
  } catch (error) {
    console.error('Error in payment verification:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = { checkout, paymentVerification, getkey};