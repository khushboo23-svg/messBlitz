const express = require('express')
const rootRoute = express.Router()
const {loginStudent, logout, registerStudent} = require('../handlers/student/loginSignup');
const { registerWarden, registerHostel } = require('../handlers/chiefWarden/adminFunctions');
const { getAllHostels } = require('../handlers/hostelQuery');
const { studentDashboard, addComplaint, deleteComplaint, addComment, deleteComment, toggleLike, upvote, downvote } = require('../handlers/student/dashboard');
const { authCW } = require('../auth/authChiefWarden');
const { loginChiefWarden, registerChiefWarden } = require('../handlers/chiefWarden/loginSignup');
const authS = require('../auth/authStudent');
const { getStudentDetailById } = require('../handlers/studentQuery');


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

rootRoute.delete('/student/deleteComplaint/:id', authS, deleteComplaint);

rootRoute.post('/student/addComment', authS, addComment);

rootRoute.post('/student/deleteComment', authS, deleteComment);

rootRoute.post('/student/addLike', authS, toggleLike)

rootRoute.post('/student/upvote',authS, upvote)

rootRoute.post('/student/downvote', authS, downvote)

rootRoute.get('/student/getStudent/:id', authS, getStudentDetailById);

module.exports = rootRoute