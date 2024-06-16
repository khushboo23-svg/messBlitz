const StudentSchema = require('../schema/schemaStudent');
const { increaseStudent } = require('./hostelOp');

const isValidStudentEmail = async function(email){
    const existingStudent = await StudentSchema.findOne({email: email});
    if(existingStudent)
        return true
    else
        return false
}

const isValidStudentId = async function(_id){
    const existingStudent = await StudentSchema.findById(_id);
    if(existingStudent)
        return true
    else
        return false
}

const isValidStudentRecoveryEmail = async function(recoveryEmail){
    const existingUser = await StudentSchema.findOne({recoveryEmail: recoveryEmail});
    if(existingUser)
        return true
    else
        return false
}

const isValidStudentRegNo = async function(regNo){
    const existingUser = await StudentSchema.findOne({regNo: regNo});
    if(existingUser)
        return true
    else
        return false
}

const createStudent = async function(data){
    const student = new StudentSchema({
        name: data.name,
        regNo: data.regNo,
        email: data.email,
        password: data.password,
        recoveryEmail: data.recoveryEmail,
        hostelName: data.hostelName,
        roomNo: data.roomNo,
        verified: false,
        feePaid: false,
        feeAmount: 0
    })
    let response;
    await student.save().then(()=>{
        response = {status: 200, data: {message: "Successfully registered the Student"}};
    }).catch((err)=>{
        response =  {status: 400, message:"some kind of error"+err};
    })
    if(response.status===200){
        await increaseStudent(data.hostelName);
    }
    return response;
}

const isValidStudent = async function(data){
    let existingStudent = await StudentSchema.findOne({email: data.email})
    if(existingStudent){
        if(existingStudent.password === data.password){
            return {_id: existingStudent._id};
        }
    }
    else{
        return null;
    }
}

const verifyStudent = async function(id){
    let existingStudent = await StudentSchema.findById(id);
    if(existingStudent){
        existingStudent.verified=true;
        await existingStudent.save();
    }
}

const isVerifiedStudentId = async function(id){
    let existingStudent = await StudentSchema.findOne({_id: id})
    if(existingStudent&&existingStudent.verified==true){
        return true;
    }
    else{
        return false;
    }
}

const getStudentIdbyEmail = async function(email){
    // console.log("hi")
    let student = await StudentSchema.findOne({email: email});
    if(student){
        return student._id;
    }
    return null;
}

const getStudentbyId = async function(_id){
    let student = await StudentSchema.findOne({_id: _id});
    if(student){
        return {
            name: student.name,
            email: student.email,
            regNo: student.regNo,
            hostelName: student.hostelName,
            profileImg: student.profileImg,
            roomNo: student.roomNo,
            feePaid: student.feePaid,
            feeAmount: student.feeAmount
        };
    }
    else{
        return null;
    }
}

const getNoOfStudentByHostelName = async function(name){
    let response = await StudentSchema.find({hostelName: name});
    return response.length;
}

const changeFeePaidstatus = async function(id){
    await StudentSchema.findOneAndUpdate({_id: id},{feePaid: true});
}


const updateFeeAmountPaid = async function(data){
    const student = await StudentSchema.findOne({_id: data.studentId});
    if(student.feeAmount)
        await StudentSchema.findOneAndUpdate({_id: data.studentId},{feeAmount: student.feeAmount+data.amount})
    else
        await StudentSchema.findOneAndUpdate({_id: data.studentId},{feeAmount: data.amount})
}

const addImage = async function(data){
    await StudentSchema.findOneAndUpdate({_id:data.studentId},{profileImg: data.image_url});
    return true;
}
// const getStudentbyEmail

// const getStudentbyRecoveryEmail

// const getStudentby

module.exports = {addImage, changeFeePaidstatus, updateFeeAmountPaid, getStudentIdbyEmail, verifyStudent, isVerifiedStudentId, isValidStudentEmail, isValidStudentRegNo, createStudent, isValidStudentRecoveryEmail, isValidStudent, getStudentbyId, isValidStudentId}