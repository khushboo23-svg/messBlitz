const { getComplaintsByHostelName } = require("../../database/operations/complaintOp");
const { getStudentbyId } = require("../../database/operations/studentOp");
const { getWardenById } = require("../../database/operations/wardenOp");

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
                complaints: processedComplaint,
            }
        })
    }
    else{
        res.send({status: 400, message: "warden doesnt seem to exist"})
    }
}

module.exports = {wardenDashboard}