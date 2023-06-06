const User = require("../models/userModel");
const { comparePassword, hashPassword } = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, mobile, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!mobile) {
      return res.send({ message: "Phone number is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }

    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    //check user
    const existingUser = await User.findOne({ email });
    //existing user
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "Already registered Please Login" });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new User({
      name,
      email,
      mobile,
      answer,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

//post login

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        status: false,
        message: "Invalid email or password",
      });
    }
    //check user

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "invalid password",
      });
    }

    //token
    const token = await jwt.sign({ _id: user._id }, "secret_key", {
      expiresIn: "10m",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//forgotPasswordController
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "question is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    //check email and answer
    const user = await User.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const updateController = async (req, res) => {
  try {
    const userInfo = await User.findById(req.params.id);
    if (!userInfo) {
      res.status(404).send({ message: "user information not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  updateController,
};
