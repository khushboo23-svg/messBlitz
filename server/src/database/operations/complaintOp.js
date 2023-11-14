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
        // console.log(doc)
        response =  {status:400, data:{...doc}}
    }).catch((err)=>{
        response =  {status:200, message: "error raised: "+err}
    });
    return response;
}

module.exports = {getAllComplaints, getComplaintsByHostelName, getComplaintsByStudentId, createComplaint}