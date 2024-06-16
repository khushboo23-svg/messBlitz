const {addImage}  = require("../../database/operations/wardenOp")

const uploadWardenProfile = async function(req, res){
    // console.log("profile",req.body.image_url);
    try{
        if(await addImage({wardenId: req.wid, image_url: req.body.image_url})){
            res.send({status: 200, data: {message: "Successfully updated the image"}});
        }
        else
            res.send({status:400, message: "Image update failed"});
    }
    catch(err){
        console.log("Error in warden profile image: "+err);
        res.send({status: 400, message:"Error: "+err});
    }
}

module.exports ={uploadWardenProfile}