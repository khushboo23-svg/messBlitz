const jwt = require("jsonwebtoken")
const { getComplaintsByHostelName, getComplaintsByStudentId, createComplaint } = require("../../database/operations/complaintOp");
const { getStudentbyId } = require("../../database/operations/studentOp");
const ComplaintSchema = require("../../database/schema/schemaComplaint");
const StudentSchema = require("../../database/schema/schemaStudent");

const studentDashboard = async function(req,res,next){
    try{
        const {_id} = await jwt.verify(req.get("authorization"), process.env.SECRET_KEY)
        let student = await getStudentbyId(_id);
        if(student){
            res.send({
                status:400,
                data: {
                    ...student,
                    complaints: await getComplaintsByHostelName(student.hostelName),
                    myComplaints: await getComplaintsByStudentId(student._id)
                }
            })
        }
        else{
            res.send({status: 400, message: "student doesnt seem to exist"})
        }
    }
    catch(err){
        console.log(err)
        res.send({status:401, message: "invalid token"});
    }
}

const addComplaint = async function(req,res,next){
    const {title,description,proofImg} = req.body;
    try{
        let _id = await jwt.verify(req.get("authorization"), process.env.SECRET_KEY)
        let student = await getStudentbyId(_id);
        if(student){
            res.send(await createComplaint({title: title, description: description, proofImg: proofImg, hostelName: student.hostelName, _id: student._id}))
        }
        else
            res.send({status:400, message: "student doesnt exist"});
    }
    catch(err){
        res.send({status:400, message: "invalid token"+err});
    }
}

// const addComment = async function(req, res){
//     const {id, }
// }

module.exports = {studentDashboard, addComplaint}