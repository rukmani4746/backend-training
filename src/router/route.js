const express = require('express')
const router = express.Router()
const registerUser = require("../controller/userController")
const createbook = require("../controller/bookController")
const createreview = require('../controller/reviewController')
const auth = require('../middleware/middleware')


//user
router.post('/register', registerUser.createUserDocument)
router.post('/login', registerUser.loginUser)
//book
router.post('/books', createbook.createBook)
router.get('/books', auth.authentication, createbook.getbooks)
router.get('/books/:bookId', auth.authentication, createbook.getBooksById)
//authentication and authorization
router.put('/books/:bookId', auth.authentication, auth.authorization, createbook.updateBooksById) //auth.authorization
router.delete('/books/:bookId', auth.authentication, auth.authorization, createbook.deleteBooksById)
//review
router.post('/books/:bookId/review', createreview.createReview)
router.put('/books/:bookId/review/:reviewId', createreview.updatereviewbookbybookid)
router.delete('/books/:bookId/review/:reviewId', createreview.deletereviewbyid)






module.exports = router;