const ChiefWardenSchema = require("../schema/schemaChiefWarden")

const isValidChiefWardenId = async function(_id){
    let existingChiefWarden = await ChiefWardenSchema.findById(_id);
    if(existingChiefWarden)
        return true
    else
        return false
}

const isValidChiefWardenEmail = async function(email){
    let existingChiefWarden = await ChiefWardenSchema.findOne({email: email});
    // console.log(existingChiefWarden)
    if(existingChiefWarden)
        return true
    else
        return false
}


const isValidChiefWardenRecoveryEmail = async function(recoveryEmail){
    let existingChiefWarden = await ChiefWardenSchema.findOne({recoveryEmail: recoveryEmail});
    if(existingChiefWarden)
        return true
    else
        return false
}

const createChiefWarden = async function(data){
    const chiefWarden = new ChiefWardenSchema({
        email: data.email,
        name: data.name,
        recoveryEmail: data.recoveryEmail,
        password:data.password
    })
    let response;
    await chiefWarden.save().then(()=>{
        response = {status: 200, data: {message: "Chief Warden created Successfully"}}
    }).catch((err)=>{
        response = {status: 400, message: "Chief Warden creation aborted"}
    })
    return response;
}

const isValidChiefWarden = async function(data){
    let existingChiefWarden = await ChiefWardenSchema.findOne({email: data.email})
    if(existingChiefWarden){
        if(existingChiefWarden.password === data.password){
            return {_id: existingChiefWarden._id};
        }
    }
    else{
        return null;
    }
}

module.exports = {isValidChiefWardenId, isValidChiefWardenEmail, isValidChiefWardenRecoveryEmail, isValidChiefWarden, createChiefWarden}