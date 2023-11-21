const jwt = require("jsonwebtoken")
const { getComplaintsByHostelName, getComplaintsByStudentId, createComplaint, getComplaintById, deleteComplaintbyId } = require("../../database/operations/complaintOp");
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
    let complaint = getComplaintById(id);
    let student = getStudentbyId(req.sid);
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
    let id = req.params.id;
    let complaint = getComplaintById(id);
    if(complaint){
        if(complaint.studentId==req.sid){
            res.send(await deleteComplaintbyId(id));
        }
        else{
            res.send({status: 400, data: "complaint is not raised by the user"})
        }
    }
    else{
        res.send({status: 400, data: "student doesnt seem to exist"})
    }
}

const addComment = async function(req, res){
    const {comment, complaintId} = req.body;
    if(isValidComplaintId(complaintId)){
        res.send(await addCommentInComplaint({comment, complaintId, writtenBy: req.sid}));
    }
    else{
        res.send({status: 400, message: "complaint doesnt exist"});
    }
}

const deleteComment = async function(req, res){
    const {commentId, complaintId} = req.body;
    const comment = await getCommentById({complaintId, commentId});
    if(comment.writtenBy==req.sid){
        res.send(await deleteComplaintbyId({complaintId, commentId}));
    }
}

module.exports = {studentDashboard, addComplaint}