const ComplaintSchema = require("../database/schema/schemaComplaint");
const StudentSchema = require("../database/schema/schemaStudent");

const studentDashboard = async function(req,res,next){
    let id
    try{
        id = await jwt.verify(req.get("authorization"), process.env.SECRET_KEY)
    }
    catch(err){
        res.send({status:401, message: "invalid token"});
    }
    let student = await StudentSchema.findOne({_id: id});
    if(student){
        let hostel = await HostelSchema.findOne({hostelName: student.hostelName})
        let complaints = await ComplaintSchema.find({hostelId: hostel._id});
        let myComplaints = await ComplaintSchema.find({hostelId: hostel._id, studentId: _id})
        res.send({
            status:400,
            data: {
                name: student.name,
                hostelName: hostel.hostelName,
                complaints: complaints,
                myComplaints: myComplaints
            }
        })
    }
    else{
        res.send({status: 400, message: "user doesnt seem to exist"})
    }
}

const addComplaint = async function(req,res,next){
    const {title,description,proofImg} = req.body;
    let id
    try{
        id = await jwt.verify(req.get("authorization"), process.env.SECRET_KEY)
    }
    catch(err){
        res.send({status:401, message: "invalid token"});
    }
    let existingStudent = StudentSchema.findOne({_id: id});
    if(existingStudent){
        const complaint = new ComplaintSchema({
            title: title,
            description: description,
            proofImg: proofImg,
            upvoteId: [],
            downvoteId: [],
            studentId: id,
            hostelName: existingStudent.hostelName,
            comment: []
        })
        complaint.save().then((doc)=>{
            res.send({status:400, data:{doc}})
        }).except((err)=>{
            res.send({status:200, message: "error raised: "+err})
        });
    }
    else{
        res.send({status:200, message:"user doesnt exist"})
    }
}

// const addComment = async function(req, res){
//     const {id, }
// }

module.exports = {studentDashboard, addComplaint}