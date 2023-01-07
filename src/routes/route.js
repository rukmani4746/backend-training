const express = require("express")
const router = express.Router()
const { authontication, authorise } = require("../middlewares/auth")
const userController = require('../controllers/userController')
const validationmware = require("../middlewares/validationmware")
const bookController = require("../controllers/bookController")

//login user
router.post("/login" ,userController.login)

//create user

router.post("/register" ,userController.createUser)

//create book
router.post("/books", bookController.createBook)

//get books by query
router.get("/books", validationmware.filterbookvalidation, bookController.getBooks1)
router.get("/books/:bookId",  bookController.getBook2)


module.exports = router