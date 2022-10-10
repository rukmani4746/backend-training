const express = require("express")
const router = express.Router();
const userController = require("../controller/userController")
const {createUser, loginUser, getUser, updateUserProfile} = userController








//<--------------------URL API's---------------------------->
// router.post("/register", createUser)
// router.post("/login", loginUser)
// router.get("/user/:userId/profile", getUser)
// router.put("/user/:userId/profile", updateUserProfile);










module.exports = router