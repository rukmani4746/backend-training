//<<-----------------------------------------------Importing Modules -------------------------------------------------------->>
const userModel = require('../Models/userModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId.isValid
const bcrypt = require("bcrypt")
const aws = require('aws-sdk')
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

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})


let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        let s3 = new aws.S3({ apiVersion: '2006-03-01' });

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "abc/" + file.originalname,
            Body: file.buffer
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }

            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })

    })
}

//<<-----------------------------------------------Create user-------------------------------------------------------->>
const createUserDocument = async function (req, res) {
    try {
        let document = req.body
        let files = req.files

        if (files && files.length > 0) {
            var photolink = await uploadFile(files[0])
        }
        if (files.length == 0)
            return res.status(400).send({ status: false, message: "File is mandatery" })

        let { fname, lname, email, phone, password, address } = document

        let pass = document.password
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(pass, salt)
        document.profileImage = photolink
        console.log(address);
        address = JSON.parse(address)
        console.log(address);


        if (Object.keys(document).length === 0) return res.status(400).send({ status: false, msg: "data require to create document" })

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


        if (!fname) return res.status(400).send({ status: false, msg: "first_name is required" })
        if (!lname) return res.status(400).send({ status: false, msg: "last_name is required" })
        if (!email) return res.status(400).send({ status: false, msg: "email_id is required" })


        if (!email.match(emailRegex)) return res.status(400).send({ status: false, msg: "email id is not valid" })

        const isUniqueEmail = await userModel.findOne({ email: email })
        if (isUniqueEmail) return res.status(400).send({ status: true, msg: "emailId id is already registerd" })


        if (!document.profileImage) return res.status(400).send({ status: false, msg: "profileimage is required" })
        if (!phone) return res.status(400).send({ status: false, msg: "phone number is required" })
        if (!password) return res.status(400).send({ status: false, msg: "password is required" })

        if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/))
            return res.status(400).send({ status: false, msg: "this is not valid password" })



        if (!address) return res.status(400).send({ status: false, msg: "address is required" })


        if (Object.keys(document.address).length == 0) return res.status(400).send({ status: false, message: "Address cannot be empty String & number" });
        //    console.log(typeof(document.address ));
        // if (typeof(document.address )!= "object") return res.status(400).send({ status: false, msg: "Address body  should be in object form" });

        if (!address.shipping.street) return res.status(400).send({ status: false, msg: "street must be present" })
        if (!address.shipping.city) return res.status(400).send({ status: false, msg: "city must be present" })
        if (!address.shipping.pincode) return res.status(400).send({ status: false, msg: "pincode must be present" })


        // let pincode1 = document.address.shipping.pincode
        // if (!/^[1-9][0-9]{5}$/.test(pincode1)) return res.status(400).send({ status: false, msg: " Please Enter Valid Pincode Of 6 Digits" });

        if (!address.billing.street) return res.status(400).send({ status: false, msg: "street must be present" })
        if (!address.billing.city) return res.status(400).send({ status: false, msg: "city must be present" })

        if (!address.billing.pincode) return res.status(400).send({ status: false, msg: "pincode must be present" })

        // let pincode = document.address.billing.pincode
        // if (!/^[1-9][0-9]{5}$/.test(pincode)) return res.status(400).send({ status: false, msg: " Please Enter Valid Pincode Of 6 Digits" });

        document.password = hashpass

        let savedData = await userModel.create(document)
        return res.status(201).send({ status: true, data: savedData })

    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error.message })
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