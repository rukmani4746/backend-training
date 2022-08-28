const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const midleware=require("../midleware/auth")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

// router.post("/login", userController.loginUser)
router.post("/login",userController.loginUser)

//The userId is sent by front end
// router.get("/users/:userId", userController.getUserData)
router.get("/users/:objId",userController.getUserData)
router.put("/users/:userId",midleware.auth, userController.updateUser)
router.put("/Delete/:userId",userController.deleteUser)

module.exports = router;