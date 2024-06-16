const express = require('express')
const rootRoute = express.Router()
const {loginStudent, logout, registerStudent} = require('../handlers/student/loginSignup');
const { registerWarden, registerHostel, chiefWardeDashboard, getUnassignedWardens, getComplaintForHostel } = require('../handlers/chiefWarden/dashboard');
const { getAllHostels, getHostelExpensePerPerson, getMessMenu, updateMessMenuWarden } = require('../handlers/hostelQuery');
const { studentDashboard, addComplaint, deleteComplaint, addComment, deleteComment, toggleLike, upvote, downvote } = require('../handlers/student/dashboard');
const { authCW } = require('../auth/authChiefWarden');
const { loginChiefWarden, registerChiefWarden } = require('../handlers/chiefWarden/loginSignup');
const {authS, authSL} = require('../auth/authStudent');
const { getStudentDetailById } = require('../handlers/studentQuery');
const { wardenDashboard, resolveComplaint, deleteComplaintW } = require('../handlers/warden/dashboard');
const { loginWarden } = require('../handlers/warden/loginSignup');
const { authW } = require('../auth/authWarden');
const { verifyy, verifyLink } = require('../handlers/student/verification');
const { upload } = require('../middleware/multerMiddleware');
const { uploadFile } = require('../cloud/cloudnary');
const { countUpvotes, countDownvotes } = require('../handlers/complaint');
const { hasGivenFeedback, getFeedback, addFeedback } = require('../handlers/student/feedback');
const { uploadBill, getBillsbyDate } = require('../handlers/warden/billUpload');

const {checkout,paymentVerification,getkey} = require('../payment/pay');
const { getHostelExpense } = require('../database/operations/hostelOp');
const { uploadStudentProfile } = require('../handlers/student/update');
const { uploadWardenProfile } = require('../handlers/warden/update');


rootRoute.post('/registerStudent', registerStudent);

rootRoute.post('/loginStudent',loginStudent)

rootRoute.post('/logout',logout)

// rootRoute.post('/loginAdmin',loginAdmin)

// rootRoute.post('/loginChiefWarden', loginChiefWarden)

// rootRoute.post('/registerChiefWarden', registerChiefWarden)

// rootRoute.post('/chiefWarden/registerWarden', authCW, registerWarden)

// rootRoute.post('/chiefWarden/registerHostel', authCW, registerHostel)

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

rootRoute.post('/warden/login', loginWarden)

rootRoute.get('/warden/dashboard', authW, wardenDashboard)

rootRoute.post('/warden/resolveComplaint', authW, resolveComplaint)

rootRoute.post('/warden/deleteComplaint', authW, deleteComplaintW)

// rootRoute.get('/chiefWarden/dashboard', authCW, chiefWardeDashboard)

// rootRoute.get('/chiefWarden/getWarden', authCW, getUnassignedWardens)

// rootRoute.post('/chiefWarden/getComplaints', authCW, getComplaintForHostel)

rootRoute.post('/student/verify', verifyy);

rootRoute.get('/verifyLink', verifyLink);

rootRoute.post('/fileUpload',upload.single('file'), uploadFile);

rootRoute.get('/upvotes', countUpvotes);

rootRoute.get('/downvotes', countDownvotes)

// rootRoute.get('/sudent/hasGivenFeedback', authS, hasGivenFeedback);

rootRoute.post('/getFeedback', getFeedback)

rootRoute.post('/student/giveFeedback', authS, addFeedback);

rootRoute.get("/getkey",getkey);

rootRoute.post("/checkout",authS, checkout);

rootRoute.post("/paymentverification", authS, paymentVerification);

rootRoute.post('/warden/uploadBill', authW, uploadBill);

rootRoute.post('/student/getBills', authS, getBillsbyDate);

rootRoute.get('/student/hostelExpensePerPerson', authS, getHostelExpensePerPerson);

rootRoute.post('/student/uploadProfile',authS, uploadStudentProfile);

rootRoute.post('/warden/uploadFile', authW,uploadWardenProfile);

rootRoute.get('/student/messMenu', authS, getMessMenu);

rootRoute.get('/warden/messMenu', authW, getMessMenu);

rootRoute.post('/warden/uploadMenu', authW, updateMessMenuWarden);
// rootRoute.get('/feedback', authW);

module.exports = rootRoute