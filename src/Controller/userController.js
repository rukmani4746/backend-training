//<<-----------------------------------------------Importing Modules -------------------------------------------------------->>
const userModel = require('../Models/userModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId.isValid
const bcrypt = require("bcrypt")
const aws = require("../aws/aws")
const validator = require("../validator/validator")
const moment = require('moment')




//<<-----------------------------------------------Validation-------------------------------------------------------->>
const isValidBody = function (data) {
  return Object.keys(data).length > 0;
};


  const isValidEmail = function (mail) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false
  };

  const isValidPassword = function (pass) {
    if (/^(?=.[A-Z])(?=.[a-z])(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,15}$/.test(pass)) return true;
    return false
  };



//<<-----------------------------------------------Aws configuration -------------------------------------------------------->>



//<<-----------------------------------------------Create user-------------------------------------------------------->>
const createUserDocument = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, message: 'No data provided' }) }

        let files = req.files;
        if (files.length == 0) { return res.status(400).send({ status: false, message: "Please provide a profile image" }) }

        //validations

        if (!(validator.isValid(data.fname))) { return res.status(400).send({ status: false, message: "First Name is required" }) }

        if (!(validator.isValid(data.lname))) { return res.status(400).send({ status: false, message: "Last Name is required" }) }

        if (!(validator.isValid(data.email))) { return res.status(400).send({ status: false, message: "Email is required" }) }

        if (!(validator.isRightFormatemail(data.email))) { return res.status(400).send({ status: false, message: "Please provide a valid email" }) }

        let isUniqueEMAIL = await userModel.findOne({ email: data.email })
        if (isUniqueEMAIL) { return res.status(400).send({ status: false, message: `User already exist with this ${data.email}. Login instead ?` }) }

        if (!(validator.isValid(data.phone))) { return res.status(400).send({ status: false, message: "Phone number is required" }) }

        if (!(validator.isRightFormatmobile(data.phone))) { return res.status(400).send({ status: false, message: "Please provide a valid Indian phone number with country code (+91..)" }) }

        let isUniquePhone = await userModel.findOne({ phone: data.phone })
        if (isUniquePhone) { return res.status(400).send({ status: false, message: `User already exist with this ${data.phone}.` }) }

        if (!(validator.isValid(data.password))) { return res.status(400).send({ status: false, message: "Password is required" }) }

        if (data.password.trim().length < 8 || data.password.trim().length > 15) { return res.status(400).send({ status: false, message: 'Password should be of minimum 8 characters & maximum 15 characters' }) }

        if (data.address == null) { return res.status(400).send({ status: false, message: "Please provide your address"})}

        let address = JSON.parse(data.address)

        if (!(validator.isValid(address.shipping.street))) { return res.status(400).send({ status: true, message: " Street address is required" }) }

        if (!(validator.isValid(address.shipping.city))) { return res.status(400).send({ status: true, message: "  City is required" }) }

        if (!(validator.isValid(address.shipping.pincode))) { return res.status(400).send({ status: true, message: " Pincode is required" }) }

        if(!(validator.isNumber(address.shipping.pincode))) { return res.status(400).send({ status: false, message: "Please provide pincode in 6 digit number"})}

        if (!(validator.isValid(address.billing.street))) { return res.status(400).send({ status: true, message: " Street billing address is required" }) }

        if (!(validator.isValid(address.billing.city))) { return res.status(400).send({ status: true, message: " City billing address is required" }) }

        if (!(validator.isValid(address.billing.pincode))) { return res.status(400).send({ status: true, message: " Billing pincode is required" }) }

        if(!(validator.isNumber(address.billing.pincode))) { return res.status(400).send({ status: false, message: "Please provide pincode in 6 digit number"})}

        //encrypting password
        const saltRounds = 10;
        hash = await bcrypt.hash(data.password, saltRounds);

        const uploadedFileURL = await aws.uploadFile(files[0])

        data.profileImage = uploadedFileURL;

        data.password = hash;

        data.address = address;

        const newUser = await userModel.create(data);

        return res.status(201).send({ status: true, message: 'success', data: newUser })


    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
}


//-----------------------------------------------user login --------------------------------------------------------

const userLogin = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data
        //================================= if data is not entered in body ==================================
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Body can't be empty! Please Provide Data" })
        
        //=================================== email not entered ==========================================
        if (!email) {
            return res.status(400).send({ status: false, message: "Please provide Email to login" })
        }
        if (!isValidEmail(email.trim())) {
            return res.status(400).send({ status: false, msg: "invalid email format" });
        }
        //================================= password not entered =======================================
        if (!password) return res.status(400).send({ status: false, message: "Please provide Password to login" })
    
        if (!isValidPassword(password)) return res.status(400).send({ status: false, msg: "invalid password format" });

        //============================= invalid email or password ======================================
        const findUser = await userModel.findOne({ email: email, password: password })
        if (!findUser)
            return res.status(401).send({ status: false, message: "Invalid email or Password" })

        // <<========================= token creation ===============================================>>

        let token = jwt.sign(
			{
				userId: findUser._id .toString(),
				exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 ), // After 24 hours it will expire //Date.now() / 1000 => second *60
				iat: Math.floor(Date.now() / 1000)
			}, "FunctionUp Group No 26");
       
        res.status(200).send({ status: true, message: "User logged in Successfully", data: { token: token, userId:findUser._id } })
    }

    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


//<<-----------------------------------------------Get user  -------------------------------------------------------->>
const getUser = async function (req, res) {
    try {
        let userId = req.params.userId

        if (!userId) return res.status.send({ status: false, msg: "userId is required in path params" })
        if (!ObjectId(userId.trim())) { return res.status(400).send({ status: false, message: `${userId} is Invalid UserId ` }) }

        if(userId != req.userId) return res.status(403).send({ status: false, message: "Unauthorized access!" });

        const userData = await userModel.findById(userId)
        if (!userData) return res.status(404).send({ status: false, message: `No user data found for this ${userId}` })

        res.status(200).send({ status: true, message: "User profile details", data: userData })
    }
    catch (err) {
        cosole.log(err.message)
        res.status(500).send({ status: false, msg: err.merssage })
    }
}





module.exports = { createUserDocument, getUser, userLogin }