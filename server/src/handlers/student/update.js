const { addImage } = require("../../database/operations/studentOp")

const uploadStudentProfile = async function(req, res){
    try{
        if(await addImage({studentId: req.sid, image_url: req.body.image_url})){
            res.send({status: 200, data: {message: "Successfully updated the image"}});
        }
        else
            res.send({status:400, message: "Image update failed"});
    }
    catch(err){
        console.log("Error in student profile image: "+err);
        res.send({status: 400, message:"Error: "+err});
    }
}

module.exports ={uploadStudentProfile}