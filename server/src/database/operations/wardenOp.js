const WardenSchema = require("../schema/schemaWarden")

const isValidWardenEmail = async function(email){
    let existingWarden = await WardenSchema.findOne({email: email});
    if(existingWarden)
        return true
    else
        return false
}

const isValidWardenId = async function(id){
    let existingWarden = await WardenSchema.findById(id);
    if(existingWarden)
        return true
    else
        return false
}

const isValidWarden = async function(data){
    let existingWarden = await WardenSchema.findOne({email: data.email});
    if(existingWarden && existingWarden.password == data.password)
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
        recoveryEmail: data.recoveryEmail
    })
    let response;
    await warden.save().then(()=>{
        response = {status: 200, data: {message: "Successfully registered the warden"}}
    }).catch((err)=>{
        response = {status: 400, message:"some kind of error"+err};
    })
    // console.log(response)
    return response;
}
const getWardenById = async function(_id){
    let warden = await WardenSchema.findById(_id);
    if(warden){ 
        return {
            name: warden.name,
            email: warden.email,
            hostelName: warden.hostelName,
            profileImg: warden.profileImg
        };
    }
    else{
        return null;
    }
}

const getAllUnassginedWarden = async function(){
    let wardens = await WardenSchema.find({});
    // console.log(typeof: )
    let unassignedWardens = wardens.filter((warden)=>((typeof warden.hostelName) === "undefined"));
    return unassignedWardens;
}

const getWardenByEmail = async function(email){
    return await WardenSchema.findOne({email: email});
}

const addHostelToWarden = async function(data){
    const warden = await WardenSchema.findOne({email: data.email});
    warden.hostelName = data.hostelName;
    await warden.save();
}

const addImage = async function(data){
    await WardenSchema.findOneAndUpdate({_id:data.wardenId},{profileImg: data.image_url});
    return true;
}

module.exports = {addImage,getAllUnassginedWarden, addHostelToWarden, isValidWardenId, isValidWarden, createWarden, isValidWardenEmail, isValidWardenRecoveryEmail, getWardenById, getWardenByEmail, isValidWarden}