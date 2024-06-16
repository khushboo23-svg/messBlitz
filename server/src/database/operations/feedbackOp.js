const FeedbackSchema = require("../schema/schemaFeedback");

const getDateCorrected = async function(date){
    let date1 = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString();
    let correctDate = new Date(date1);
    return correctDate;
}
 
const getFeedbackByDate = async function(data){
    let {start_date, end_date} = data;
    return await FeedbackSchema.find({createdAt:{$gte:start_date,$lte:end_date}})
}

const postFeedback = async function(data){
    let correctDate = await getDateCorrected(new Date());
    let {id, rating} = data;
    const feedback = new FeedbackSchema({
        id: id,
        rating: rating,
        date: correctDate
    });
    let response;
    await feedback.save().then(()=>{
        response = {status: 200, data: {message: "Successfully registered the feedback"}};
    }).catch((err)=>{
        response =  {status: 400, message:"some kind of error"+err};
    })
    return response;
}

const hasSubmittedFeedback = async function(data){
    let correctDate = await getDateCorrected(new Date());
    let feedback = await FeedbackSchema.find({id: data.id, date: correctDate});
    if(feedback.length>0){
        return true;
    }
    return false;
}

module.exports = {getFeedbackByDate, postFeedback, hasSubmittedFeedback};