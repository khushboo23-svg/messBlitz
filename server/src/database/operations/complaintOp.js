const express = require("express")
const ComplaintSchema = require("../schema/schemaComplaint")

const getAllComplaints = async function(){
    return ComplaintSchema.find({});
}

const getComplaintsByStudentId = async function(_id){
    return ComplaintSchema.find({studentId: _id});
}

const getComplaintsByHostelName = async function(hostelName){
    return ComplaintSchema.find({hostelName: hostelName});
}

const getComplaintById = async function(_id){
    return ComplaintSchema.findById(_id);
}

const createComplaint = async function(data){
    const complaint = new ComplaintSchema({
        title: data.title,
        description: data.description,
        proofImg: data.proofImg,
        upvoteId: [],
        downvoteId: [],
        studentId: data._id,
        hostelName: data.hostelName,
        comment: []
    })
    // console.log(complaint)
    let response;
    await complaint.save().then((doc)=>{
        console.log(doc)
        response =  {status:200, data:doc}
    }).catch((err)=>{
        response =  {status:400, error: "error creating complaint: "+err}
    });
    return response;
}

const deleteComplaintbyId = async function(_id){
    let response;
    await ComplaintSchema.findOneAndDelete({_id: _id}).then(()=>{
        response = {status: 200, data: {message: "successfully deleted the complaint"}}
    }).catch((err)=>{
        response = {status: 400, message: err};
    })
    return response;
}

const addCommentInComplaint = async function(data){
    const doc = await ComplaintSchema.findOne({_id: data.complaintId});
    doc.comments.push({comment: data.comment, writtenBy: data.writtenBy});
    let response;
    await doc.save().then((doc)=>{
        response = {status: 200, data: doc};
    }).catch((err)=>{
        response = {status: 400, message: "Error raised due to "+err};
    })
    return response;
}

const deleteCommentById = async function(data){
    const doc = await ComplaintSchema.findOne({_id: data.complaintId});
    let new_comments = doc.comments.filter(comment=>comment._id !=data.commentId)
    let response;
    if(new_comments.length==doc.comments.length){
        response = {status: 400, message: "Can't find the comment to delete"}
    }
    else{
        doc.comments = new_comments;
        await doc.save().then((doc)=>{
            response = {status: 200, data: doc};
        }).catch((err)=>{
            response = {status: 400, message: "Error raised due to "+err};
        })
    }
    return response;
}

// const toggleLikeInComment = async function(data){
//     const doc = await ComplaintSchema.findOne({_id: data.complaintId});
//     let new_comments = doc.comments.filter(comment => comment._id!=data.commentId);
//     let cur_comment = doc.comments.filter(comment => comment._id==data.commentId)
//     let new_likes = cur_comment.likes.filter(like=> like!=data._id)
//     if(new_likes.length===cur_comment.likes.length){
//         cur_comment
//     }
// }

module.exports = {getAllComplaints, getComplaintsByHostelName, getComplaintsByStudentId, createComplaint, getComplaintById,deleteComplaintbyId, addCommentInComplaint, deleteCommentById}