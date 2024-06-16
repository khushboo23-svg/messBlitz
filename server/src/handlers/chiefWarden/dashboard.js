const HostelSchema = require('../../database/schema/schemaHostel');
const WardenSchema = require('../../database/schema/schemaWarden');
const { createWarden, addHostelToWarden, isValidWardenRecoveryEmail, isValidWardenEmail, getWardenById, getWardenByEmail, getAllUnassginedWarden } = require('../../database/operations/wardenOp');
const { isValidHostelName, createHostel, getAllHostels } = require('../../database/operations/hostelOp');
const { getComplaintsByHostelName } = require('../../database/operations/complaintOp');
const { getStudentbyId } = require('../../database/operations/studentOp');
const registerWarden = async (req,res)=>{
    const {name, email, recoveryEmail} = req.body
    if((await isValidWardenRecoveryEmail(recoveryEmail))||(await isValidWardenEmail(email))){
        res.send({status:400, message: "Unique fields already exist"});
    }
    else{
        // console.log("hi")
        res.send(await createWarden({name,email,recoveryEmail}));
    }
}
const getUnassignedWardens = async function(req, res){
    try{
        let wardens = await getAllUnassginedWarden();
        // console.log(wardens)
        if(wardens.length!=0){
            res.send({status: 200, data: {wardens: wardens}});
        }
        else{
            res.send({status: 400, message:"no warden is free"})
        }
    }
    catch(err){
        res.send({status: 400, message:"error:"+err})
    }
}

const registerHostel = async function(req,res){
    try{
        const {hostelName, messMenu, warden} = req.body;

        if(await isValidHostelName(hostelName)){
            res.send({status: 400, message: "Hostel With this name already exists"})
        }
        else if(!(await isValidWardenEmail(warden))){
            res.send({status: 400, message:"No such warden exists"});
        }
        else{
            let wardenDoc = await getWardenByEmail(warden);
            if(wardenDoc.hostelName==undefined){
                await addHostelToWarden({email: warden, hostelName: hostelName});
                res.send(await createHostel({hostelName, messMenu, warden}));
            }
            else{
                res.send({status: 400, messgae: "this warden has already been assgined a hostel"})
            }
        }
    }
    catch(err){
        res.send({status: 400, message: "error: "+err})
    }
}

const chiefWardeDashboard = async function(req, res){
    try{
        let hostels = await getAllHostels();
        let hostelWardenMap = [];
        for (let hostel of hostels){
            let warden = await getWardenByEmail(hostel.warden);
            hostelWardenMap.push({...warden._doc, ...hostel._doc})
        }
        res.send({status: 200, data: hostelWardenMap});
    }
    catch(err){
        res.send({status: 400, message: "error:"+err})
    }
}

const getComplaintForHostel = async function(req, res){
    // try{
        let complaints= await getComplaintsByHostelName(req.body.hostelName);
        // console.log(complaints)
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
    // }
    // catch(err){
    //     res.send({status: 400, message: "chiefWarden doesnt seem to exist"})
    // }
}

module.exports = {getUnassignedWardens, getComplaintForHostel, registerWarden, registerHostel, chiefWardeDashboard}