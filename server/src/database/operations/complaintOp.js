const ComplaintSchema = require("../schema/schemaComplaint");
const StudentSchema = require("../schema/schemaStudent");
const getAllComplaints = async function(){
    return await ComplaintSchema.find({});
}

const getComplaintsByStudentId = async function(_id){
    return await ComplaintSchema.find({studentId: _id});
}

const getComplaintsByHostelName = async function(hostelName){
    // console.log(hostelName)
    return await ComplaintSchema.find({hostelName: hostelName});
}

const getComplaintById = async function(_id){
    return await ComplaintSchema.findById(_id);
}

const getCommentById = async function(data){
    let complaint = await ComplaintSchema.findById(data.complaintId);
    if(complaint){
        let existingComment = complaint.comments.filter(doc=>data.commentId==doc._id);
        // console.log(existingComment)
        if(existingComment.lenth!=0){
            return existingComment[0];
        }
        else{
            return null;
        }
    }
    else{
        return null;
    }
}

const createComplaint = async function(data){
    console.log(data.proofImg);
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
    // console.log(response)
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

const toggleLikeInComment = async function(data){
    let response=-1;
    const doc = await ComplaintSchema.findOne({_id: data.complaintId});
    let new_comments = doc.comments.filter(comment => comment._id!=data.commentId);
    if(new_comments.length===doc.comments.length-1){
        let cur_comment = doc.comments.filter(comment => comment._id==data.commentId)[0]
        if(cur_comment.likedBy.length==0){
            cur_comment.likedBy.push(data._id)
            response=1;
        }
        else{
            let new_likes = cur_comment.likedBy.filter(like=> like!=data._id)
            if(new_likes.length===cur_comment.likedBy.length-1){
                cur_comment.likedBy=new_likes;
                response=0;
            }
            else{
                cur_comment.likedBy.push(data._id)
                response=1;
            }
        }
        new_comments.push(cur_comment)
        doc.comments = new_comments;
        await doc.save();
    }
    return response;
}

const getAllComplaintsWithStatusByHostelName = async function(data){
    complaints= await getComplaintsByHostelName(data.hostelName);
    let new_complaints = [];
    complaints.forEach((complaint)=>{
        if(complaint.upvoteId.includes(data._id)){
            new_complaints.push({...complaint._doc, voteStatus: 1});
        }
        else if(complaint.downvoteId.includes(data._id)){
            new_complaints.push({...complaint._doc, voteStatus: -1});
        }
        else{
            new_complaints.push({...complaint._doc, voteStatus: 0});
        }
    })
    return new_complaints;
}

const isUpvoted = async function(data){
    const complaint = await getComplaintById(data.complaintId);
    let status;
    // console.log(typeof complaint.upvoteId)
    if(complaint.upvoteId.includes(data._id)){
        status = true;
    }
    else
        status = false;
    return status;
}

const isDownvoted = async function(data){
    const complaint = await getComplaintById(data.complaintId);
    let status;
    if(complaint.downvoteId.includes(data._id)){
        status = true;
    }
    else
        status = false;
    return status;
}

const addUpvote = async function(data){
    const complaint = await ComplaintSchema.findOne({_id: data.complaintId});
    if(complaint){
        complaint.upvoteId.push(data._id);
        await complaint.save();
    }
}

const addDownvote  = async function(data){
    const complaint = await ComplaintSchema.findOne({_id: data.complaintId})
    if(complaint){
        complaint.downvoteId.push(data._id);
        await complaint.save();
    }
}

const removeUpvote = async function(data){
    const complaint = await ComplaintSchema.findOne({_id: data.complaintId});
    if(complaint){
        let newUpvoteId = complaint.upvoteId.filter(id=>id!=data._id);
        complaint.upvoteId = newUpvoteId;
        await complaint.save();
    }
}

const removeDownvote = async function(data){
    const complaint = await ComplaintSchema.findOne({_id: data.complaintId});
    if(complaint){
        let newDownvoteId = complaint.downvoteId.filter(id=>id!=data._id);
        complaint.downvoteId = newDownvoteId;
        await complaint.save();
    }
}

const totalUpvotes = async function(data){
    const complaint = await ComplaintSchema.findOne({_id: data.complaintId});
    return complaint.upvoteId.length;
}

const totalDownvotes = async function(data){
    const complaint = await ComplaintSchema.findOne({_id: data.complaintId});
    return complaint.downvoteId.length;
}

module.exports = {totalUpvotes, totalDownvotes, isDownvoted, isUpvoted, addDownvote, addUpvote, removeUpvote, removeDownvote, getAllComplaintsWithStatusByHostelName, getAllComplaints, toggleLikeInComment, getComplaintsByHostelName, getCommentById, getComplaintsByStudentId, createComplaint, getComplaintById,deleteComplaintbyId, addCommentInComplaint, deleteCommentById}