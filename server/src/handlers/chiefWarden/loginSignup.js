const jwt = require("jsonwebtoken")
const {isValidChiefWardenEmail, isValidChiefWardenRecoveryEmail, createChiefWarden, isValidChiefWarden } = require("../../database/operations/chiefWardenOp")
const registerChiefWarden = async (req,res)=>{
    const {name, email, password, recoveryEmail} = req.body
    if((await isValidChiefWardenEmail(email)) || (await isValidChiefWardenRecoveryEmail(recoveryEmail))){
        res.send({status: 200, message: "Unquie Fields contain existing values"})
    }
    else{
        let data = {name, email, password, recoveryEmail}
        const obj= await createChiefWarden(data)
        // console.log(obj)
        res.send(obj);
    }
}

const loginChiefWarden = async function(req,res){
    const {email, password} = req.body;
    let data = {email, password}
    let response = await isValidChiefWarden(data);
    if(response){
        const token = jwt.sign({_id: response._id}, process.env.SECRET_KEY)
        res.send({status:200,
            data: {
                message: "successfully logged in",
                token: token
            }})
    }
    else{
        res.send({status: 400, message: "Wrong Credentials"})
    }
    
}

module.exports = {registerChiefWarden, loginChiefWarden}