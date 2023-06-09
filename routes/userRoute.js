const express = require("express");

const {
  registerController,
  loginController,
  forgotPasswordController,
  updateController,
  searchFriend,
  // getUser,
} = require("../controller/userController");

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/signUp", registerController);

//LOGIN || POST
router.post("/signIn", loginController);

//GET USER
// router.get("/getUser/:id",getUser);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//update information
router.put("/:id", updateController);

router.get("/search/:key", searchFriend);

module.exports = router;