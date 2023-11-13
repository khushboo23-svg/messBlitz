const jwt = require('jsonwebtoken')
const HostelSchema = require('../database/schema/schemaHostel');
const AdminSchema = require('../database/schema/schemaAdmin');
const registerWarden = async (req,res)=>{
    const {name,email,password,hostelName} = req.body
    let existingAdmin = await AdminSchema.findOne({email: email});
    if(existingAdmin){
        res.send({status:400, message: "email already registered!!"})
    }
    else{
            const admin = new AdminSchema({
                name,
                email,
                typeOfUser:"warden",
                password,
                hostelId
            })
            await admin.save().then(()=>{
                res.send({status: 200, data: {message: "Successfully registered the admin"}})
            }).catch((err)=>{
                res.send({status: 400, message:"some kind of error"+err});
            })
    }
}

const replaceWarden = async function(req,res){
    pass
}

const registerHostel = async function(req,res,next){
    const {hostelName, messMenu, hostelHead} = req.body;
    try{
        let existingHostel = await HostelSchema.findOne({hostelName: hostelName});
        if(existingHostel){
            res.send({status: 200, message:"Failed to register hostel as the name already exists"})
        }
        else{
            const hostel = new HostelSchema({
                hostelName: hostelName,
                messMenu: messMenu,
                hostelHead: hostelHead,
                noOfStudents: 0
            })
            hostel.save().then(()=>{
                res.send({status:400, data:{message:"Hostel created Sucessfully"}})
            }).catch((err)=>{
                res.send({status:200,message:"The following error arose "+err})
            })
        }
    }
    catch(err){
        res.send({status: 200, message:"Failed to register hostel unknown error"})
    }
}

module.exports = {registerWarden,registerHostel}