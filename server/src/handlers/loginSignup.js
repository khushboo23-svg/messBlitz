const jwt = require('jsonwebtoken')
const StudentSchema = require('../database/schema/schemaStudent')
const AdminSchema = require('../database/schema/schemaAdmin')

const registerStudent = async (req,res)=>{
    const {name, regNo, email, password, recoveryEmail, roomNo} = req.body
    let student = await StudentSchema.findOne({email: email});
    if(student){
        res.send({status:400, message: "email already registered!!"})
    }
    else{
        student = await StudentSchema.findOne({regNo: regNo})
        if(student){
            res.send({status: 400, message:"registration number already taken!!"})
        }
        else{
            const student = new StudentSchema({
                name,
                regNo,
                email,
                password,
                recoveryEmail,
                roomNo
            })
            await student.save().then(()=>{
                res.send({status: 200, data: {message: "Successfully registered the user"}})
            }).catch((err)=>{
                res.send({status: 400, message:"some kind of error"+err});
            })
        }
    }
}


const loginStudent = async (req,res)=>{
    
    const {email, password} = req.body
    let existingUser = await StudentSchema.findOne({email: email})
    if(existingUser){
        if(existingUser.password===password){
            const token = jwt.sign({_id: existingUser._id}, process.env.SECRET_KEY)
            res.send({status:200,
                data: {status: 200,
                    message: "student successfully logged in",
                    token: token
                }})
        }
        else{
            res.send({status: 400, message: "password mismatch"})
        }
    }
    else{
        res.send({status: 400, message: "wrong credentials!!"})
    }
}

const loginAdmin = async function(req,res,next){
    const {email, password} = req.body
    let existingUser = await AdminSchema.findOne({email: email})
    if(existingUser){
        if(existingUser.password===password){
            const token = jwt.sign({_id: existingUser._id}, process.env.SECRET_KEY)
            res.send({status:200,
                data: {
                    message: "successfully logged in",
                    token: token
                }})
        }
        else{
            res.send({status: 400, message: "password mismatch"})
        }
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

module.exports = {registerStudent, loginStudent, loginAdmin, logout}