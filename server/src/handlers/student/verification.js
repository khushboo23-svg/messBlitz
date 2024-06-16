const nodemailer = require('nodemailer');
const { getStudentbyId, getStudentIdbyEmail, verifyStudent } = require('../../database/operations/studentOp');
const VerifierSchema = require('../../database/schema/verifierSchema');
const { response } = require('express');

const config = {
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    auth: {
        user: "miku006900@gmail.com",
        pass: "ljhyymitncbrdzuc"
    }
}

const verifyy = async function(req, res){
    try{
        const transporter = nodemailer.createTransport(config);
        transporter.verify(function(error, success) {
            if (error) {
              console.error(error);
            } else {
              console.log('Server is ready to take our messages');
            }
          });
        req.sid = await getStudentIdbyEmail(req.body.email);
        const student = await getStudentbyId(req.sid);
        let data = {};
        data.from = "miku006900@gmail.com";
        data.to = student.email;
        data.subject = "verify your account"
        const OTP = Math.floor(Math.random() * 10000);
        let studentVerifier = await VerifierSchema.findOne({id: req.sid});
        if(studentVerifier){
            studentVerifier.OTP = OTP;
            await studentVerifier.save();
        }
        else{
            let newStudentVerifier = new VerifierSchema({
                id: req.sid,
                OTP: OTP
            })
            await newStudentVerifier.save()
        }
        const url = process.env.BACK_END_URL+`/verifyLink?id=${req.sid}&OTP=${OTP}`;
        data.html = `<p><h4>Hello,</h4>
        <p>Thank you for registering. Please verify your email by clicking on the link below:</p>
        <a href="${url}">Verify Email</a></p>`
        // console.log(data.html)
        // data.text = "hello this is a verification email"
        // console.log(data);
        transporter.sendMail(data, (err,info)=>{
            if(err)
                console.log(err)
            // else
            //     console.log(info)
        })
        res.send({status: 200, data:{message: "email sent"}})
    }
    catch(err){
        res.send({status: 400, message: "error: "+err})
    }
}

const verifyLink = async function(req, res){
    const id = req.query.id;
    const OTP = req.query.OTP;
    const verifier = await VerifierSchema.findOne({id: id});
    if(verifier&&verifier.OTP==OTP){
        const date=Date.now();
        if(date-verifier.updatedAt<300000){
            await verifyStudent(req.query.id);
            const htmlResponse = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Verification</title>
    </head>
    <body>
      <h1>You have been verified! Try to log in again!!</h1>
    </body>
    </html>
  `;
  await VerifierSchema.findOneAndDelete({id: id});
            res.send(htmlResponse);
        }
        else{
            const htmlResponse = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Verification</title>
    </head>
    <body>
      <h1>Link expired!!!</h1>
    </body>
    </html>
  `;
            res.send(htmlResponse)
        }
    }
    else{
        const htmlResponse = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Verification</title>
    </head>
    <body>
      <h1>Invalid link!!</h1>
    </body>
    </html>
  `;
  res.send(htmlResponse)
    }
}

module.exports = {verifyy, verifyLink}