const express = require("express");

const {
  registerController,
  loginController,
  forgotPasswordController,
  updateController,
} = require("../controller/userController");

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/signUp", registerController);

//LOGIN || POST
router.post("/signIn", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//update information
router.put("/:id", updateController);

module.exports = router;
