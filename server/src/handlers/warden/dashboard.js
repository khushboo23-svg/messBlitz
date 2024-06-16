const nodemailer = require('nodemailer');
const { getComplaintsByHostelName, getCommentById, deleteComplaintbyId, getComplaintById } = require("../../database/operations/complaintOp");
const { getStudentbyId } = require("../../database/operations/studentOp");
const { getWardenById } = require("../../database/operations/wardenOp");

const config = {
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    auth: {
        user: "miku006900@gmail.com",
        pass: "ljhyymitncbrdzuc"
    }
}

const mailStudent = async function(data){
    try{
        const transporter = nodemailer.createTransport(config);
        transporter.verify(function(error, success) {
            if (error) {
              console.error(error);
            } else {
              console.log('Server is ready to take our messages');
            }
          });
        let complaint = await getComplaintById(data.complaintId);
        let studentId = complaint.studentId;
        const student = await getStudentbyId(studentId);
        // console.log(student)
        let mailData = {};
        mailData.from = "miku006900@gmail.com";
        mailData.to = student.email;
        mailData.subject = data.subject;
        mailData.html = data.html
        // console.log(mailData.html)
        // data.text = "hello this is a verification email"
        // console.log(data);
        transporter.sendMail(mailData, (err,info)=>{
            if(err)
                console.log(err)
            
        })
    }
    catch(err){
        console.log(err);
    }
}

const wardenDashboard = async function(req,res){
    let warden = await getWardenById(req.wid);
    // console.log(warden)
    if(warden){
        let complaints= await getComplaintsByHostelName(warden.hostelName);
        let processedComplaint = [];
        for (let complaint of complaints) {
            let complaintStudent=await getStudentbyId(complaint.studentId)
            processedComplaint.push({...complaint._doc, studentName:complaintStudent.name, studentRegNo:complaintStudent.regNo});
        }
        res.send({
            status:200,
            data: {
                ...warden,
                complaints: processedComplaint,
            }
        })
    }
    else{
        res.send({status: 400, message: "warden doesnt seem to exist"})
    }
}

const resolveComplaint = async function(req, res){
    // console.log(req.body)
    try{
        let data = {};
        data.complaintId = req.body.complaintId;
        let complaint = await getComplaintById(req.body.complaintId);
        data.subject = `Sub: Resolved complaint: ${complaint.title}`
        data.html = `<p><p>Dear Student,</p> <br/> <p>It is a pleasure to inform you that your complaint with title <strong>${complaint.title}</strong> and description <strong>${complaint.description}</strong> has been resolved</p> <br/> <br/>Regards <br/>Warden<br/>${complaint.hostelName}</p>`
        // console.log("hello")
        await mailStudent(data);
        // console.log(req.body)
        await deleteComplaintbyId(req.body.complaintId);
        // console.log("hello")
        res.send({status: 200, data: {message: "Sucessfully resolved the complaint"}})
    }
    catch(err){
        // console.log(err);
        res.send({status: 400, data: {message: "error: "+err}});
    }
}

const deleteComplaintW = async function(req, res){
    let data = {};
    
}

module.exports = {wardenDashboard, resolveComplaint, deleteComplaintW}