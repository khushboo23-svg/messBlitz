const WardenSchema = require("../schema/schemaWarden")

const isValidWardenEmail = async function(email){
    let existingWarden = await WardenSchema.findOne({email: email});
    if(existingWarden)
        return true
    else
        return false
}

const isValidWardenRecoveryEmail = async function(recoveryEmail){
    let existingWarden = await WardenSchema.findOne({recoveryEmail: recoveryEmail});
    if(existingWarden)
        return true
    else
        return false
}

const createWarden = async function(data){
    let password="admin";
    const warden = new WardenSchema({
        name: data.name,
        email:data.email,
        password,
        recoveryEmail: data.recoveryEmail,
        appointedBy: data.appointedBy
    })
    let response;
    await warden.save().then(()=>{
        response = {status: 200, data: {message: "Successfully registered the warden"}}
    }).catch((err)=>{
        response = {status: 400, message:"some kind of error"+err};
    })
    return response;
}

module.exports = {createWarden, isValidWardenEmail, isValidWardenRecoveryEmail}