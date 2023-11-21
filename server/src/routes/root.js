const express = require('express')
const rootRoute = express.Router()
const {loginStudent, logout, registerStudent} = require('../handlers/student/loginSignup');
const { registerWarden, registerHostel } = require('../handlers/chiefWarden/adminFunctions');
const { getAllHostels } = require('../handlers/hostelQuery');
const { studentDashboard, addComplaint, deleteComplaint } = require('../handlers/student/dashboard');
const { authCW } = require('../auth/authChiefWarden');
const { loginChiefWarden, registerChiefWarden } = require('../handlers/chiefWarden/loginSignup');
const authS = require('../auth/authStudent');
const { addCommentInComplaint, deleteCommentById, deleteComplaintbyId } = require('../database/operations/complaintOp');


rootRoute.post('/registerStudent', registerStudent);

rootRoute.post('/loginStudent',loginStudent)

rootRoute.post('/logout',logout)

// rootRoute.post('/loginAdmin',loginAdmin)

rootRoute.post('/loginChiefWarden', loginChiefWarden)

rootRoute.post('/registerChiefWarden', registerChiefWarden)

rootRoute.post('/chiefWarden/registerWarden', authCW, registerWarden)

rootRoute.post('/chiefWarden/registerHostel', authCW, registerHostel)

rootRoute.get('/getAllHostels', getAllHostels);

rootRoute.get('/student/dashboard', authS, studentDashboard);

rootRoute.post('/student/addComplaint', authS, addComplaint);

rootRoute.delete('/student/deleteComplaint/:id', authS, deleteComplaintbyId);

rootRoute.post('/student/addComment', authS, addCommentInComplaint);

rootRoute.post('/student/deleteComment', authS, deleteCommentById);

module.exports = rootRoute