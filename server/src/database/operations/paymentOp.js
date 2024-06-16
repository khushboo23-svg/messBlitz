const paymentSchema = require("../schema/schemaPayment");

const addBillData = async function(data){
    let response;
    try{
        const payment = new paymentSchema({
            amount: data.amount,
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            studentId: data.studentId
        })
        await payment.save().then(()=>{
            response = {status: 200, data: {message: "Successfully registered the Student"}};
        }).catch((err)=>{
            response =  {status: 400, message:"error"+err};
        })
    }
    catch(err){
        response={status: 400, message: "error"+err}
    }
    return response;
}

module.exports = {addBillData};