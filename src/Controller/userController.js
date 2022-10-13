//<<-----------------------------------------------Importing Modules -------------------------------------------------------->>
const userModel = require('../Models/userModel')
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId.isValid
const bcrypt = require("bcrypt")
const aws = require("../aws/aws")
const validator = require("../validator/validator")



//<<-----------------------------------------------Create user-------------------------------------------------------->>
const createUserDocument = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, message: 'No data provided' }) }


        //validations

        if (!(validator.isValid(data.fname))) { return res.status(400).send({ status: false, message: "First Name is required" }) }

        if (!(validator.isValidName(data.fname))) return res.status(400).send({ status: false, message: "Enter valid Fname" });

        if (!(validator.isValid(data.lname))) { return res.status(400).send({ status: false, message: "Last Name is required" }) }

        if (!(validator.isValidName(data.lname))) return res.status(400).send({ status: false, message: "Enter valid Lname" });

        if (!(validator.isValid(data.email))) { return res.status(400).send({ status: false, message: "Email is required" }) }

        if (!(validator.isRightFormatemail(data.email))) { return res.status(400).send({ status: false, message: "Please provide a valid email" }) }

        let files = req.files;
        if (files.length == 0) { return res.status(400).send({ status: false, message: "Please provide a profile image" }) }

        if (files && files.length > 0) {
            if (!(validator.isValidImg(files[0].mimetype))) { return res.status(400).send({ status: false, message: "Image Should be of JPEG/ JPG/ PNG" }); }
        }

        let isUniqueEmail = await userModel.findOne({ email: data.email })
        if (isUniqueEmail) { return res.status(400).send({ status: false, message: `User already exist with this ${data.email}. Login instead ?` }) }

        if (!(validator.isValid(data.phone))) { return res.status(400).send({ status: false, message: "Phone number is required" }) }

        if (!(validator.isRightFormatmobile(data.phone))) { return res.status(400).send({ status: false, message: "Please provide a valid Indian phone number with country code (+91..)" }) }

        let isUniquePhone = await userModel.findOne({ phone: data.phone })
        if (isUniquePhone) { return res.status(400).send({ status: false, message: `User already exist with this ${data.phone}.` }) }

        if (!(validator.isValid(data.password))) { return res.status(400).send({ status: false, message: "Password is required" }) }

        if (!validator.isValidPassword(data.password)) return res.status(400).send({ status: false, msg: "password is not in correct format" })

        if(!data.address)  return res.status(400).send({ status: false, message: "Please provide your address" }) 
        
        if (data.address == null) { return res.status(400).send({ status: false, message: "Please provide your address" }) }

        if (data.address == null || data.address == undefined) { return res.status(400).send({ status: false, message: "Please provide your address" }) }
        // console.log(data.address)
        let address = JSON.parse(data.address)
        if (!address.shipping) { return res.status(400).send({ status: true, message: " Shipping address is required" }) }
        if (!(validator.isValid(address.shipping.street))) { return res.status(400).send({ status: true, message: " Street address is required" }) }

        if (!(validator.isValid(address.shipping.city))) { return res.status(400).send({ status: true, message: "  City is required" }) }

        if (!(validator.isValid(address.shipping.pincode))) { return res.status(400).send({ status: true, message: " Pincode is required" }) }

        if (!(validator.isNumber(address.shipping.pincode))) { return res.status(400).send({ status: false, message: "Please provide pincode in 6 digit number" }) }

        if (!address.billing) { return res.status(400).send({ status: true, message: " billing address is required" }) }

        if (!(validator.isValid(address.billing.street))) { return res.status(400).send({ status: true, message: " Street billing address is required" }) }

        if (!(validator.isValid(address.billing.city))) { return res.status(400).send({ status: true, message: " City billing address is required" }) }

        if (!(validator.isValid(address.billing.pincode))) { return res.status(400).send({ status: true, message: " Billing pincode is required" }) }

        if (!(validator.isNumber(address.billing.pincode))) { return res.status(400).send({ status: false, message: "Please provide pincode in 6 digit number" }) }

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
        console.log(error.message)
        return res.status(500).send({ message: error.message })
    }
}


//-----------------------------------------------user login --------------------------------------------------------

const userLogin = async function (req, res) {
    try {
        let mail = req.body.email;
        let pass = req.body.password;
        let data = req.body;
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, message: 'No data provided' }) }

        if (!(validator.isValid(mail))) { return res.status(400).send({ status: false, message: 'EMAIL is required' }) }

        if (!(validator.isRightFormatemail(mail))) { return res.status(400).send({ status: false, message: 'Please provide a valid email' }) }

        if (!(validator.isValid(pass))) { return res.status(400).send({ status: false, message: 'Password is required' }) }

        if (pass.trim().length < 8 || pass.trim().length > 15) { return res.status(400).send({ status: false, message: 'Password should be of minimum 8 characters & maximum 15 characters' }) }

        const mailMatch = await userModel.findOne({ email: mail }).select({ _id: 1, password: 1 })
        if (!mailMatch) return res.status(400).send({ status: false, message: "Email is incorrect" })

        const userId = mailMatch._id;
        const password = mailMatch.password;

        const passMatch = await bcrypt.compare(pass, password)
        if (!passMatch) return res.status(400).send({ status: false, message: "Password is incorrect" })

        const token = jwt.sign({
            userId: mailMatch._id.toString(), iat: new Date().getTime() / 1000,
        }, "FunctionUp Group No 26", { expiresIn: "30m" });


        res.setHeader("authorization", "token");
        return res.status(200).send({ status: true, message: "You are successfully logged in", data: { userId: userId, token: token } })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
}



//<<-----------------------------------------------Get user  -------------------------------------------------------->>
const getUser = async function (req, res) {
    try {
        let userId = req.params.userId

        if (!userId) return res.status.send({ status: false, msg: "userId is required in path params" })
        if (!ObjectId(userId.trim())) { return res.status(400).send({ status: false, message: `${userId} is Invalid UserId ` }) }

        if (userId != req.userId) return res.status(403).send({ status: false, message: "Unauthorized access!" });

        const userData = await userModel.findById(userId)
        if (!userData) return res.status(404).send({ status: false, message: `No user data found for this ${userId}` })

        return res.status(200).send({ status: true, message: "User profile details", data: userData })
    }
    catch (err) {
        cosole.log(err.message)
        res.status(500).send({ status: false, msg: err.merssage })
    }
}

///////////////****************/ PUT-Update API (USER) *******************/////////////////////////////////
const updateUser = async function (req, res) {
    
        try {
    
            let files = req.files
            let userDetails = req.body
            let userId = req.params.userId
            let userIdFromToken = req.userId
    
            if (!validator.isValidObjectId(userId)) {
                return res.status(400).send({ status: false, message: "Invalid UserId" })
            }
    
            const findUserData = await userModel.findById(userId)
    
            if (!findUserData) {
                return res.status(404).send({ status: false, message: "user not found" })
            }
    
            if (findUserData._id.toString() != userIdFromToken) {
                return res.status(403).send({ status: false, message: "You Are Not Authorized!!" })
            }
    
            let { fname, lname, email, phone, password, address,profileImage} = userDetails
    
            
            if (!validator.isValidRequestBody(userDetails)) {
                return res.status(400).send({ status: false, message: "Please provide user's details to update." })
            }
    
            if (!validator.validString(fname)) {
                return res.status(400).send({ status: false, message: 'first name is Required' })
            }
    
            if (!validator.validString(lname)) {
                return res.status(400).send({ status: false, message: 'last name is Required' })
            }
    
            if (!validator.validString(email)) {
                return res.status(400).send({ status: false, message: 'email is Required' })
            }
            if (email) {
    
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email))
                    return res.status(400).send({ status: false, message: "Invalid Email id." })
    
                const checkEmailFromDb = await userModel.findOne({ email: userDetails.email })
    
                if (checkEmailFromDb)
                    return res.status(404).send({ status: false, message: `emailId is Exists. Please try another email Id.` })
            }
    
    
            if (!validator.validString(phone)) {
                return res.status(400).send({ status: false, message: 'phone number is Required' })
            }
    
            if (phone) {
                if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/).test(userDetails.phone))
                    return res.status(400).send({ status: false, message: "Phone number must be a valid Indian number." })
    
                const checkPhoneFromDb = await userModel.findOne({ phone: userDetails.phone })
    
                if (checkPhoneFromDb) {
                    return res.status(400).send({ status: false, message: `${userDetails.phone} is already in use, Please try a new phone number.` })
                }
            }
    
    
            if (!validator.validString(password)) {
                return res.status(400).send({ status: false, message: 'password is Required' })
            }
    
            if (password) {
    
                if (!(password.length >= 8 && password.length <= 15)) {
                    return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15 " })
                }
                var hashedPassword = await bcrypt.hash(password, 10)
                
            }
    
            if (!validator.validString(address)) {
                return res.status(400).send({ status: false, message: 'Address is Required' })
            }
    
            if (address) {
                address = JSON.parse(userDetails.address)
              
                if (address.shipping) {
                    if (address.shipping.street) {
                        if (!validator.isValid(address.shipping.street)) {
                            return res.status(400).send({ status: false, message: 'Please provide street' })
                        }
                        
                    }
                    if (address.shipping.city) {
                        if (!validator.isValid(address.shipping.city)) {
                            return res.status(400).send({ status: false, message: 'Please provide city' })
                        }
                        
                    }
                    if (address.shipping.pincode) {
                        if(!validator.isValid(address.shipping.pincode)) {
                            return res.status(400).send({status: false, msg: 'Please provide pincode'})
                        }
                        if (!Number.isInteger(Number(address.shipping.pincode))) {
                            return res.status(400).send({ status: false, message: 'please provide a valid pincode' })
                        }
                        
                        
                    }
                }
                if (address.billing) {
                    if (address.billing.street) {
                        if (!validator.isValid(address.billing.street)) {
                            return res.status(400).send({ status: false, message: 'Please provide street' })
                        }
                        
                    }
                    if (address.billing.city) {
                        if (!validator.isValid(address.billing.city)) {
                            return res.status(400).send({ status: false, message: 'Please provide city' })
                        }
                        
                    }
                    if (address.billing.pincode) {
                        if(!validator.isValid(address.billing.pincode)) {
                            return res.status(400).send({status: false, msg: 'please provide pincode'})
                        }
                        if (!Number.isInteger(Number(address.billing.pincode))) {
                            return res.status(400).send({ status: false, message: 'Please provide valid pincode' })
                        }
                        
                    }
                }
            }
            
            if (files&&files.length) {
                var userImage = await aws_s3.uploadFile(files[0])
            }
            
            
        
            let updatedData={
                fname:fname,
                lname:lname,
                email:email,
                phone:phone,
                password:hashedPassword,
                profileImage:userImage,
                address:{
                    shipping:{
                        street:address?.shipping?.street||findUserData.address.shipping.street,
                        city:address?.shipping?.city||findUserData.address.shipping.city,
                        pincode:address?.shipping?.pincode||findUserData.address.shipping.pincode,
    
                    },
                    billing:{
                        street:address?.billing?.street||findUserData.address.billing.street,
                        city:address?.billing?.city||findUserData.address.billing.city,
                        pincode:address?.billing?.pincode||findUserData.address.billing.pincode,
    
                    }
                }    
            }
        
    
            let updateProfileDetails = await userModel.findOneAndUpdate(
                { _id: userId },
                  updatedData,
                { new: true })
    
            return res.status(200).send({ status: true, msg: "User Update Successful!!", data: updateProfileDetails })
    
        } catch (err) {
            return res.status(500).send({ status: false, error: err.message })
        }
    }
    


module.exports = { createUserDocument, getUser, userLogin, updateUser }