const express = require('express')
const router = express.Router()
const registerUser = require("../controller/userController")
const createbook = require("../controller/bookController")
const auth = require('../middleware/middleware')

//user
router.post('/register',registerUser.createUserDocument)
router.post('/login',registerUser.loginUser)
//book
router.post('/books',auth.authentication,createbook.createBook)
router.get('/books',auth.authentication,createbook.getbooks)
router.get('/books/:bookId',authentication,createbook.getBooksById)






module.exports = router;