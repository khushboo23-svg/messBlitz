const jwt = require('jsonwebtoken')
const {isValidStudentEmail, isValidStudentRegNo, isValidStudentRecoveryEmail, createStudent, isValidStudent} = require('../../database/operations/studentOp')

const registerStudent = async (req,res)=>{
    const {name, regNo, email, password, hostelName, recoveryEmail, roomNo} = req.body
    if((await isValidStudentEmail(email)) || (await isValidStudentRecoveryEmail(recoveryEmail)) || (await isValidStudentRegNo(regNo))){
        res.send({status: 200, message: "Unquie Fields contain existing values"})
    }
    else{
        let data = {name, regNo, email, password, hostelName, recoveryEmail, roomNo}
        const obj= await createStudent(data)
        console.log(obj)
        res.send(obj);
    }
}


const loginStudent = async (req,res)=>{
    const {email, password} = req.body
    console.log(req.body)
    let student = await isValidStudent({email, password});
    console.log(student)
    if(student){
        // console.log(process.env.SECRET_KEY)
        const token = jwt.sign({_id: student._id}, process.env.SECRET_KEY,{
            expiresIn: '7d'
        })
        res.send({status:200,
            data: {
                message: "student successfully logged in",
                token: token
            }})
    
    }
    else{
        res.send({status: 400, message: "wrong credentials!!"})
    }
}


const logout = function(req, res, next){
    res.send({status: 200, data: {
        message: "successful",
        token: undefined
    }})
}

module.exports = {registerStudent, loginStudent, logout}