const { hasSubmittedFeedback, getFeedbackByDate, postFeedback } = require("../../database/operations/feedbackOp");


const addFeedback = async (req,res) => {
    const {ratings} = req.body;
    if((await hasSubmittedFeedback({id: req.sid}))){
        res.send({status: 403, data: {message: "Feedback Already Added for the day"}})
    }
    else{
        let response = await postFeedback({rating:ratings, id: req.sid});
        res.send(response);
    }
}

const getFeedback = async (req, res) =>{
    try{
        // console.log('hello')
        let {start_date,end_date} = req.body;
        // console.log(req.body);
        let response = await getFeedbackByDate({start_date: start_date, end_date: end_date})
        // console.log("hello from backend",response);
        const rows = 4;
        const cols = 5;
        const result = [];
        // console.log("hello");
        for (let i = 0; i < rows; i++) {
        result[i] = []; // Create an empty array for each row
        for (let j = 0; j < cols; j++) {
            result[i][j] = 0; // Fill each cell with zero
        }}
        if(response){
            response.forEach(el => {
                let i=0;
                el.rating.forEach(element => {
                    result[i][element]++;
                    i++;
                });
            });
        }
        // console.log(result);
        res.send({status: 200, data: {feedbacks: result}});
    }
    catch(err){
        res.send({status: 400, data: {message: "Error:"+err}});
    }
}

const hasGivenFeedback = async (req,res) =>{
    if(await hasSubmittedFeedback({id: req.sid})){
        res.send({status: 400, data:{message:"User already has given a feedback for today"}});
    }
    else{
        res.send({status: 200, data:{message: "User hasn't given a feedback yet"}});
    }
}

module.exports = {addFeedback, getFeedback, hasGivenFeedback}