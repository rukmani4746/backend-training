//redirect request to particular method on controller
import express from "express";
import { registerUser, loginUser, isUserExist } from "../controllers/auth";
import { body } from "express-validator";


const router = express.Router();

//POST /auth/
router.post(
  "/",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage("please enter a valid name,minimum 4 character long"),
    body("email")
      .trim()
      .isEmail()
      .custom((emailId:String) => {
        return isUserExist(emailId)
          .then((status:Boolean) => {
            if (status) {
              // const err = new ProjectError("User Already Exist!")
              // err.statusCode = 422;
              // throw err;
              return Promise.reject("User Already Exist!");
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Enter atleast 8 character long password!"),
      body('confirm_password')
      .trim()
      .custom((value:String,{req})=>{
        if(value != req.body.password){
            return Promise.reject("Password Missmatch");
        }
        return true;
       
      })
  ],
  registerUser
);

//POST /auth/login/
router.post("/login", loginUser);

export default router;
