import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from 'jsonwebtoken'


export const registerController = async (req, res) => {
   try {
      const { name, email, password, phone, address } = req.body
      //validations
      if (!name) {
         return res.send({ error: 'Name is required' })
      }
      if (!email) {
         return res.send({ error: 'Email is required' })
      }
      if (!password) {
         return res.send({ error: 'Password is required' })
      }
      if (!phone) {
         return res.send({ error: 'Phone number is required' })
      }
      if (!address) {
         return res.send({ error: 'Address is required' })
      }


      //check user
      const existingUser = await userModel.findOne({ email })
      //existing user
      if (existingUser) {
         return res.status(200).send({ success: true, message: 'Already registered Please Login' });
      }
      //register user
      const hashedPassword = await hashPassword(password);
      //save
      const user = await new userModel({
         name,
         email,
         phone,
         address,
         password: hashedPassword,

      }).save();
      res.status(201).send({
         success: true,
         message: "User Register Successfully",
         user,
      });

   } catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         message: 'error in registration',
         error
      })

   }
};



//post login

export const loginController = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(404).send({
            status: false,
            message: "Invalid email or password"
         })
      }
      //check user

      const user = await userModel.findOne({ email });
      if (!user) {
         return res.status(404).send({
            success: false,
            message: "Email is not Registered",
         })
      }
      const match = await comparePassword(password, user.password)
      if (!match) {
         return res.status(200).send({
            success: false,
            message: "invalid password",
         })
      }

      //token
      const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d',
   });
   res.status(200).send({success:true,message:'login successfully',
   user:{
      name:user.name,
      email:user.email,
      phone:user.phone,
      address:user.address,
   },
   token,
});
   }
   catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         message: "Error in Login",
         error
      })
   }

}


//test controller

export const testController = (req,res) => {
   res.send('protected route');
}