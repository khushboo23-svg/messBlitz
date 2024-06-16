const { isUpvoted, isDownvoted, addUpvote, addDownvote, removeDownvote, removeUpvote, getCommentById,getComplaintsByHostelName, getAllComplaintsWithStatusByHostelName, getComplaintsByStudentId, createComplaint, getComplaintById, deleteComplaintbyId, addCommentInComplaint, deleteCommentById, toggleLikeInComment } = require("../../database/operations/complaintOp");
const { getStudentbyId } = require("../../database/operations/studentOp");

const studentDashboard = async function(req,res,next){
    let student = await getStudentbyId(req.sid);
    if(student){
        let complaints = await getAllComplaintsWithStatusByHostelName({hostelName: student.hostelName, _id: req.sid});
        let processedComplaint = [];
        for (let complaint of complaints) {
            let complaintStudent=await getStudentbyId(complaint.studentId)
            processedComplaint.push({...complaint, studentName:complaintStudent.name, studentRegNo:complaintStudent.regNo});
        }
        res.send({
            status:200,
            data: {
                ...student,
                complaints: processedComplaint,
                myComplaints: processedComplaint.filter(doc=>doc.studentId == req.sid)
            }
        })
    }
    else{
        res.send({status: 400, message: "student doesnt seem to exist"})
    }
}

const addComplaint = async function(req,res){
    let {title,description,image_url} = req.body;
    // console.log(req.body);
    let student = await getStudentbyId(req.sid);
    if(student){
        res.send(await createComplaint({title: title, description: description, proofImg: image_url, hostelName: student.hostelName, _id: req.sid}))
    }
    else
        res.send({status:400, message: "student doesnt exist"});
}

const getComplaint = async function(req, res){
    let id = req.params.id;
    let complaint = await getComplaintById(id);
    let student = await getStudentbyId(req.sid);
    if(complaint){
        if(complaint.hostelName==student.hostelName){
            res.send({status: 200, data: complaint})
        }
        res.send({status: 400, message: "Student is not authorized to see other hostel's complaints"})
    }
    else{
        res.send({status: 400, message: "Complaint doesnt exist"})
    }
}

const deleteComplaint = async function(req, res){
    let complaintId = req.params.id;
    let complaint = await getComplaintById(complaintId);
    if(complaint){
        if(complaint.studentId==req.sid){
            res.send(await deleteComplaintbyId(complaintId));
        }
        else{
            res.send({status: 400, message: "complaint is not raised by the user"})
        }
    }
    else{
        res.send({status: 400, message: "complaint doesnt seem to exist"})
    }
}

const addComment = async function(req, res){
    try{
        const {comment, complaintId} = req.body;
        let complaint = await getComplaintById(complaintId);
        let student = await getStudentbyId(req.sid);
        if(student && complaint &&student.hostelName === complaint.hostelName){
            res.send(await addCommentInComplaint({comment, complaintId, writtenBy: student.name}));
        }
        else{
            res.send({status: 400, message: "complaint doesnt exist"});
        }
    }
    catch(err){
        console.log("error in add comment: "+err);
        res.send({status: 400, message: "Error"+err});
    }
}

const deleteComment = async function(req, res){
    try{
        const {commentId, complaintId} = req.query;
        const comment = await getCommentById({complaintId, commentId});
        if(comment&&comment.writtenBy==req.sid){
            res.send(await deleteCommentById({complaintId, commentId}));
        }
        else{
            res.send({status: 400, message: "you are not authorized to do this"})
        }
    }
    catch(err){
        console.log("error in delete comment: "+err);
        res.send({status: 400, message: "Error"+err});
    }
}

const toggleLike = async function(req, res){
    const {commentId, complaintId} = req.body;
    // console.log(req.body);
    const comment = await getCommentById({complaintId, commentId});
    if(comment){
        let response =await toggleLikeInComment({complaintId, commentId, _id: req.sid})
        if(response===-1){
            res.send({status: 400, message:"Comment doesnt exist"});
        }
        else if(response===1)
            res.send({status: 200, data: {response, message:"like added successfully"}});
        else
            res.send({status: 200, data: {response, message:"like removed successfully"}})
    }
    else{
        res.send({status: 400, message: "Comment doesnt exist"})
    }
}

const upvote = async function(req, res){
    const {complaintId} = req.body;
    let complaint = getComplaintById(complaintId);
    if(complaint){
        try{
            if(await isUpvoted({_id: req.sid, complaintId})){
                // await removeUpvote({_id: req.sid, complaintId});
                // res.send({status: 200, data: {message: "removed upvote successfully"}})
                res.send({status: 200, data: {message: "Already upvoted"}})
            }
            else if(await isDownvoted({_id: req.sid, complaintId})){
                await removeDownvote({_id: req.sid, complaintId});
                await addUpvote({_id: req.sid, complaintId});
                res.send({status: 200, data: {message: "removed downvote and upvoted successfully"}})
            }
            else{
                await addUpvote({_id: req.sid, complaintId});
                // console.log(req.sid);
                res.send({status: 200, data: {message: "upvoted successfully"}})
            }
        }
        catch(err){
            res.send({status: 400, message: "error:"+err})
        }
    }
    else{
        res.send({status: 400, message: "error: complaint doesnt exist anymore"})
    }
}

const downvote = async function(req, res){
    const {complaintId} = req.body;
    let complaint = getComplaintById(complaintId);
    if(complaint){
        try{
            if(await isDownvoted({_id: req.sid, complaintId})){
                // await removeDownvote({_id: req.sid, complaintId});
                // res.send({status: 200, data: {message: "removed downvote successfully"}})
                res.send({status: 200, data: {message: "Already downvoted"}});
            }
            else if(await isUpvoted({_id: req.sid, complaintId})){
                await removeUpvote({_id: req.sid, complaintId});
                await addDownvote({_id: req.sid, complaintId});
                res.send({status: 200, data: {message: "removed upvote and downvoted successfully"}})
            }
            else{
                await addDownvote({_id: req.sid, complaintId});
                res.send({status: 200, data: {message: "downvoted successfully"}})
            }
        }
        catch(err){
            res.send({status: 400, message: "error:"+err})
        }
    }
    else{
        res.send({status: 400, message: "error: complaint doesnt exist anymore"})
    }
}


module.exports = {upvote, downvote, studentDashboard, addComplaint, deleteComplaint, getComplaint, addComment, deleteComment, toggleLike}