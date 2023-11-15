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