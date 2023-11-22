const { getCommentById,getComplaintsByHostelName, getComplaintsByStudentId, createComplaint, getComplaintById, deleteComplaintbyId, addCommentInComplaint, deleteCommentById, toggleLikeInComment } = require("../../database/operations/complaintOp");
const { getStudentbyId } = require("../../database/operations/studentOp");

const studentDashboard = async function(req,res,next){
    let student = await getStudentbyId(req.sid);
    if(student){
        res.send({
            status:200,
            data: {
                ...student,
                complaints: await getComplaintsByHostelName(student.hostelName),
                myComplaints: await getComplaintsByStudentId(req.sid)
            }
        })
    }
    else{
        res.send({status: 400, message: "student doesnt seem to exist"})
    }
}

const addComplaint = async function(req,res){
    const {title,description,proofImg} = req.body;
    let student = await getStudentbyId(req.sid);
    if(student){
        res.send(await createComplaint({title: title, description: description, proofImg: proofImg, hostelName: student.hostelName, _id: req.sid}))
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
            res.send({status: 400, data: "complaint is not raised by the user"})
        }
    }
    else{
        res.send({status: 400, data: "complaint doesnt seem to exist"})
    }
}

const addComment = async function(req, res){
    const {comment, complaintId} = req.body;
    let complaint = await getComplaintById(complaintId);
    let student = await getStudentbyId(req.sid);
    if(student && complaint &&student.hostelName === complaint.hostelName){
        res.send(await addCommentInComplaint({comment, complaintId, writtenBy: req.sid}));
    }
    else{
        res.send({status: 400, message: "complaint doesnt exist"});
    }
}

const deleteComment = async function(req, res){
    const {commentId, complaintId} = req.query;
    const comment = await getCommentById({complaintId, commentId});
    if(comment&&comment.writtenBy==req.sid){
        res.send(await deleteCommentById({complaintId, commentId}));
    }
    else{
        res.send({status: 400, message: "you are not authorized to do this"})
    }
}

const toggleLike = async function(req, res){
    const {commentId, complaintId} = req.body;
    console.log(req.body);
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

module.exports = {studentDashboard, addComplaint, deleteComplaint, getComplaint, addComment, deleteComment, toggleLike}