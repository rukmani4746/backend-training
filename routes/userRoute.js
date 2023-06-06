const express = require("express");

const { registerController , loginController } = require("../controller/userController")

//router object
const router = express.Router();


//routing
//REGISTER || METHOD POST
router.post('/signUp', registerController);

//LOGIN || POST
router.post("/signIn", loginController);

module.exports = router;