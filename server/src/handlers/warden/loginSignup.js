const jwt = require('jsonwebtoken')
const { isValidWarden, getWardenByEmail } = require("../../database/operations/wardenOp")

const loginWarden = async function(req,res,next){
    const {email, password} = req.body
    if(await isValidWarden({email, password})){
        const warden = await getWardenByEmail(email)
        // console.log(warden)
        const token = jwt.sign({_id: warden._id}, process.env.SECRET_KEY)
        res.send({status:200,
            data: {
                message: "successfully logged in",
                token: token,
                warden: warden,
            }})
    }
    else
    {
        res.send({status: 400, message: "wrong credentials!!"})
    }
}

module.exports = {loginWarden}