const { totalUpvotes, totalDownvotes } = require("../database/operations/complaintOp");

const countUpvotes = async(req,res)=>{
    try{
        let count = await totalUpvotes({data: req.complaintId});
        res.send({status: 200, data:{count: count}});
    }
    catch(err){
        res.send({status: 400, message: "error:"+err})
    }
}

const countDownvotes = async(req,res)=>{
    try{
        let count = await totalDownvotes({data: req.complaintId});
        res.send({status: 200, data:{count: count}});
    }
    catch(err){
        res.send({status: 400, message: "error:"+err})
    }
}

module.exports = {countUpvotes, countDownvotes}