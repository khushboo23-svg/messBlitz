const { addBills, getBills } = require("../../database/operations/billOp");
const { increaseExpense } = require("../../database/operations/hostelOp");
const { getWardenById } = require("../../database/operations/wardenOp");

const uploadBill = async function(req, res){
    // console.log("hello",req.body);
    // req.body.image_url=await uploadFile({});
    try{
        let response = await addBills({url: req.body.billFile, amount: req.body.billAmount});
        if(response.status===200){
            let warden = await getWardenById(req.wid);
            await increaseExpense({name:warden.hostelName,expense:req.body.billAmount});
        }
        res.send(response)
    }
    catch(error){
        res.send({status: 400, data: {message: "error uploading bill:"+error}})
    }
}

const getBillsbyDate = async function(req, res){
    try{
        let response = await getBills({date: req.body.date});
        // console.log(response)
        res.send({status: 200, data: response});
    }
    catch(err){
        res.send({status: 400, data:{message: "error: "+err}});
    }
}

module.exports = {uploadBill, getBillsbyDate}