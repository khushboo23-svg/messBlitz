// const HostelSchema = require("../database/schema/schemaHostel")


// const getAllHostels = async function(req,res,next){
//     const hostels = await HostelSchema.find({},'hostelName');
//     console.log(hostels);
//     res.send({status:200,data:{
//         hostels: hostels
//     }})
// }

// module.exports = {getAllHostels}

const { getHostelExpense, updateMessMenu, getMessMenuDB } = require("../database/operations/hostelOp");
const { getStudentbyId } = require("../database/operations/studentOp");
const { getWardenById } = require("../database/operations/wardenOp");
const HostelSchema = require("../database/schema/schemaHostel");

const getAllHostels = async (req, res) => {
    try {
        const hostels = await HostelSchema.find({}, 'hostelName');
        // console.log(hostels);
        res.send({
            status: 200,
            data: {
                hostels: hostels
            }
        });
    } catch (error) {
        console.error('Failed to retrieve hostels:', error);
        res.status(400).send({
            status: 400,
            message: "Failed to retrieve data from the database"
        });
    }
}

const getHostelExpensePerPerson = async function(req, res){
    try{
        let student = await getStudentbyId(req.sid);
        let hostelExpense = await getHostelExpense(student.hostelName);
        res.send({status:200, data:{expense: hostelExpense}})
    }
    catch(err){
        console.log("Error in hostel expense: "+err)
        res.send({status:400,message:"error:"+err})
    }
}

const updateMessMenuWarden = async function(req, res){
    try{
        let warden = await getWardenById(req.wid);
        await updateMessMenu({hostelName: warden.hostelName, messMenu: req.body.menu_url});
        res.send({status: 200, data:{message:"Menu updated successfully"}})
    }
    catch(err){
        console.log("Error in update mess menu: "+err);
        res.send({status: 400, message: "Error: Menu not updated"})
    }
}

const getMessMenu = async function(req, res){
    try{
        let user;
        if(req.sid){
            user = await getStudentbyId(req.sid);
        }
        if(req.wid){
            user = await getWardenById(req.wid)
        }
        let response = await getMessMenuDB(user.hostelName)
        res.send({status:200, data:{messMenu:response}});
    }
    catch(err){
        console.log("Error in getting mess menu: "+err);
        res.send({status: 400, data:{message: "Error: Not able to fetch menu"}})
    }
}

module.exports = { getMessMenu, updateMessMenuWarden, getAllHostels , getHostelExpensePerPerson};
