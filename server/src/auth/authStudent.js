const jwt = require('jsonwebtoken');
const { isValidStudentId, isVerifiedStudentId } = require('../database/operations/studentOp');
const authS = async function(req, res,next){
    try{
        const {_id} = await jwt.verify(req.get("authorization"), process.env.SECRET_KEY)
        if(!(await isValidStudentId(_id))){
            res.send({status: 400, message:"You are not authorized to do this"});
        }
        else{
            if(await isVerifiedStudentId(_id)){
                req.sid = _id;
                next()
            }
            else{
                res.send({status: 403, message:"You aren't verified please verify"})
            }
        }
    }
    catch(err){
        console.log(err)
        res.send({status: 400, message:"You are not authorized to do thisss"});
    }
}

const authSL = async function(req, res,next){
    try{
        // console.log(req.get('authorization'))
        const {_id} = await jwt.verify(req.get("authorization"), process.env.SECRET_KEY)
        if(!(await isValidStudentId(_id))){
            res.send({status: 400, message:"You are not authorized to do this"});
        }
        else{
            req.sid = _id;
            next()
        }
    }
    catch(err){
        res.send({status: 400, message:"You are not authorized to do thisss"});
    }
}



module.exports = {authS, authSL}