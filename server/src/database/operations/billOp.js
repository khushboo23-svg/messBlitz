const BillSchema = require("../schema/schemaBill");

const getDateCorrected = async function(date2){
    let date = new Date(date2)
    let date1 = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString();
    let correctDate = new Date(date1);
    return correctDate;
}

const getBills = async function(data){
    let date = await getDateCorrected(data.date);
    return await BillSchema.find({date: date});
}

const addBills = async function(data){
    let image_url = data.url;
    let amount = data.amount;
    let date = await getDateCorrected(new Date());
    const bill = new BillSchema({
        image_url: image_url,
        amount: amount,
        date: date
    })
    let response;
    await bill.save().then(()=>{
        response = {status: 200, data: {message: "Successfully added the bill"}};
    }).catch((err)=>{
        response =  {status: 400, message:"error: "+err};
    })
    return response;
}

module.exports = {addBills,getBills}