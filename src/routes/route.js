const express = require("express")
const router = express.Router();
const userController = require("../controller/userController")
const {createUserDocument, loginUser, getUser, updateUserProfile} = userController
const {authentication} = require("../middleware/auth")



//<--------------------URL API's---------------------------->
router.post("/register", createUserDocument)
// router.post("/login", loginUser)
router.get("/user/:userId/profile", getUser)
// router.put("/user/:userId/profile", updateUserProfile);










module.exports = router