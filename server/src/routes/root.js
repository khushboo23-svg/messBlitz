const express = require('express')
const rootRoute = express.Router()
const {loginStudent, loginAdmin, logout, registerStudent} = require('../handlers/loginSignup');
const { registerWarden, registerHostel } = require('../handlers/adminFunctions');
const { getAllHostels } = require('../handlers/hostelQuery');

rootRoute.post('/registerStudent', registerStudent);

rootRoute.post('/loginStudent',loginStudent)

rootRoute.post('/logout',logout)

rootRoute.post('/loginAdmin',loginAdmin)

rootRoute.post('/registerWarden',registerWarden)

rootRoute.post('/registerHostel', registerHostel)

rootRoute.get('/getAllHostels', getAllHostels);

module.exports = rootRoute