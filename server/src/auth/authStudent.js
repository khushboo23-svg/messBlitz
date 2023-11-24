const jwt = require('jsonwebtoken');
const { isValidStudentId } = require('../database/operations/studentOp');
const authS = async function(req, res,next){
    try{
        console.log(req.get('authorization'))
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

module.exports = authS