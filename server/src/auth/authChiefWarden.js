const jwt = require('jsonwebtoken')
const {isValidChiefWardenId} = require("../database/operations/chiefWardenOp")
const authCW = async function(req, res,next){
    try{
        const {_id} = jwt.verify(req.get("authorization"), process.env.SECRET_KEY)
        if(!(await isValidChiefWardenId(_id))){
            res.send({status: 400, message:"You are not authorized to do this"});
        }
        else{
            req.cwid = _id;
            next()
        }
    }
    catch(err){
        res.send({status: 400, message:"You are not authorized to do this"});
    }
}

module.exports = {authCW};