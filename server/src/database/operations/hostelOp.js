const HostelSchema = require("../schema/schemaHostel");

const isValidHostelName = async function(name){
    let existingHostel =await HostelSchema.findOne({hostelName: name});
    if(existingHostel)
        return true;
    else
        return false;
}

const createHostel = async function(data){
    const hostel = new HostelSchema({
        hostelName: data.hostelName,
        messMenu: data.messMenu,
        warden: data.warden,
        noOfStudents: 0
    })
    let response;
    await hostel.save().then(()=>{
        response = {status:200, data:{message:"Hostel created Sucessfully"}}
    }).catch((err)=>{
        response = {status:400,message:"The following error arose "+err}
    })
    return response;
}

const getAllHostels = async function(){
    return await HostelSchema.find({});
}

const increaseStudent = async function(name){
    let hostel = await HostelSchema.find({hostelName: name});
    if(hostel){
        if(hostel.noOfStudents)
            await HostelSchema.findOneAndUpdate({hostelName: name},{noOfStudents: (hostel.noOfStudents+1)});
        else
            await HostelSchema.findOneAndUpdate({hostelName: name},{noOfStudents: 1});
    }
}

const increaseExpense = async function(data){
    let hostel = await HostelSchema.findOne({hostelName: data.name});
    if(hostel){
        if(hostel.expense)
            await HostelSchema.findOneAndUpdate({hostelName: data.name},{expense: hostel.expense+Number(data.expense)});
        else
            await HostelSchema.findOneAndUpdate({hostelName: data.name},{expense: data.expense});
    }
}

const getHostelExpense = async function(hostelName){
    let hostel = await HostelSchema.findOne({hostelName: hostelName});
    if(hostel.noOfStudents===0){
        await increaseStudent(hostel.hostelName);
    }
    // console.log(hostel)
    if(hostel){
        return (hostel.expense/hostel.noOfStudents);
    }
    return 0;
}

const updateMessMenu = async function(data){
    let hostel = await HostelSchema.findOneAndUpdate({hostelName: data.hostelName},{messMenu: data.messMenu});
}

const getMessMenuDB = async function(hostelName){
    let hostel = await HostelSchema.findOne({hostelName: hostelName});
    return hostel.messMenu;
}

module.exports = {updateMessMenu, getMessMenuDB, getHostelExpense, increaseExpense, increaseStudent ,isValidHostelName, createHostel, getAllHostels}