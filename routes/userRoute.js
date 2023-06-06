const express = require("express");

const { registerController , loginController, forgotPasswordController } = require("../controller/userController")

//router object
const router = express.Router();


//routing
//REGISTER || METHOD POST
router.post('/signUp', registerController);

//LOGIN || POST
router.post("/signIn", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController)

module.exports = router;