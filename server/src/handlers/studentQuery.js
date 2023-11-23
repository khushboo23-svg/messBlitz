const { getStudentbyId } = require("../database/operations/studentOp")

const getStudentDetailById = async function(req, res){
    try{
        let student = await getStudentbyId(req.params.id);
        if(student){
            res.send({status: 200, data: student});
        }
        else{
            res.send({status: 400, message: "Student doesnt exist"})
        }
    }
    catch(err){
        res.send({status: 400, message:"error"+err})
    }
}

module.exports = {getStudentDetailById}