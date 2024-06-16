const jwt = require('jsonwebtoken')
const { isValidWardenId } = require('../database/operations/wardenOp');
const authW = async function(req, res,next){
    try{
        const {_id} = await jwt.verify(req.get("authorization"), process.env.SECRET_KEY)
        if(!(await isValidWardenId(_id))){
            res.send({status: 400, message:"You are not authorized to do thiss"});
        }
        else{
            req.wid = _id;
            next()
        }
    }
    catch(err){
        res.send({status: 400, message:"You are not authorized to do thiss"});
    }
}

module.exports = {authW};