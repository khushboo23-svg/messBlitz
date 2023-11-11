const express = require('express')
const rootRoute = express.Router()
const {loginStudent, loginAdmin, logout, registerStudent} = require('../handlers/loginSignup')

rootRoute.post('/registerStudent', registerStudent);

rootRoute.post('/loginStudent',loginStudent)

rootRoute.post('/logout',logout)

rootRoute.post('/loginAdmin',loginAdmin)

module.exports = rootRoute