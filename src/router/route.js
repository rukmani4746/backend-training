const express = require('express')
const router = express.Router()
const registerUser = require("../controller/userController")


router.post('/register',registerUser.createUserDocument)
router.post('/login',registerUser.loginUser)






module.exports = router;