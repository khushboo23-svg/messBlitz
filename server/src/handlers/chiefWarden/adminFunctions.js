const HostelSchema = require('../../database/schema/schemaHostel');
const WardenSchema = require('../../database/schema/schemaWarden');
const { createWarden, isValidWardenRecoveryEmail, isValidWardenEmail } = require('../../database/operations/wardenOp');
const { isValidHostelName, createHostel } = require('../../database/operations/hostelOp');
const registerWarden = async (req,res)=>{
    const {name, email, recoveryEmail} = req.body
    if((await isValidWardenRecoveryEmail(recoveryEmail))||(await isValidWardenEmail(email))){
        res.send({status:400, message: "Unique fields already exist"});
    }
    else{
        res.send(await createWarden({name,email,recoveryEmail,appointedBy: req.body.cWid}));
    }
}

const registerHostel = async function(req,res){
    const {hostelName, messMenu, warden} = req.body;
    console.log("hello")
    if(await isValidHostelName(hostelName)){
        res.send({status: 400, message: "Hostel With this name already exists"})
    }
    else if(!(await isValidWardenEmail(warden))){
        res.send({status: 400, message:"No such warden exists"});
    }
    else{
        res.send(await createHostel({hostelName, messMenu, warden}));
    }
}

module.exports = {registerWarden,registerHostel}