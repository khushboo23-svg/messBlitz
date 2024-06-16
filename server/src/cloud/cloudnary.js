const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET_KEY,
});

const uploadFile = async (req,res) => {
    
    const file = req.file;
    try {
        if (!file) return null;

        const response = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto"
        });
        fs.unlinkSync(file.path); 
        // console.log("hello")
        res.send({status: 200, data: {url: response.url}});
    } catch (error) {
        console.log("error in upload file:" + error);
        fs.unlinkSync(file.path);
        res.send({status: 400, data: {message: "Error"+error}})
    }
}

module.exports = { uploadFile };
