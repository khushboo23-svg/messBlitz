const jwt = require("jsonwebtoken")
const { getComplaintsByHostelName, getComplaintsByStudentId, createComplaint, getComplaintById } = require("../../database/operations/complaintOp");
const { getStudentbyId } = require("../../database/operations/studentOp");
const ComplaintSchema = require("../../database/schema/schemaComplaint");
const StudentSchema = require("../../database/schema/schemaStudent");

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

// const deleteComplaint = async function(req, res){
//     let student = getStudentbyId(req.sid);
//     let _id = req.params.id;
//     if(student){
//         let complaint = getComplaintById(_id);
//         if(complaint){
//             if(complaint.studentId==student._id){
//                 res.send
//             }
//         }
//         else{
//             res.send({status: 400, data: "student doesnt seem to exist"})
//         }
//     }
//     else{
//         res.send({status: 400, data: "student doesnt seem to exist"})
//     }
// }

// const addComment = async function(req, res){
//     const {id, }
// }

module.exports = {studentDashboard, addComplaint}