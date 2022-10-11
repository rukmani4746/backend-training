const express = require("express")
const router = express.Router();
const userController = require("../controller/userController")
const {createUserDocument, userLogin, getUser, updateUser} = userController
const {authentication} = require("../middleware/auth")



//<--------------------URL API's---------------------------->
 router.post("/register", createUserDocument)
 router.post("/login", userLogin)
 router.get("/user/:userId/profile", authentication, getUser)
 router.put("/user/:userId/profile", updateUser);










module.exports = router