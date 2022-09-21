// const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
// const reviewModel = require('../models/reviewModel')
const validator = require('../validator/validator')
const jwt = require('jsonwebtoken')
const moment = require('moment')

let createUserDocument = async function (req, res) {
    try {


        let document = req.body
        let { title, name, phone, email, password, address, } = document
        // let pincode = req.body.address.pincode
        if (Object.keys(document).length === 0) return res.status(400).send({ status: false, msg: "require data to create document" })
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!title) return res.status(400).send({ status: false, msg: "title must be present" })
        if (!validator.isTitleValid(title)) return res.status(400).send({ status: false, msg: "title is not valid" })

        if (!name) return res.status(400).send({ status: false, msg: " name is required " })

        if (!validator.nameValid(name)) return res.status(400).send({ status: false, msg: "name is not valid" })

        if (!phone) return res.status(400).send({ status: false, msg: "phone number is not present" })
        if (!validator.isPhoneValid(phone)) return res.status(400).send({ status: false, msg: "number is not valid" })

        const isUniquePhoneNumber = await userModel.findOne({ phone: phone })
        if (isUniquePhoneNumber) return res.status(400).send({ status: true, msg: "phone number is already registerd" })

        if (!email) {
            return res.status(400).send({ status: false, msg: "emailId is not present" })
        }
        if (!email.match(emailRegex)) return res.status(400).send({ status: false, msg: "email is not valid" })

        const isUniqueEmail = await userModel.findOne({ email: email })
        if (isUniqueEmail) return res.status(400).send({ status: true, msg: "emailId id is already registerd" })

        if (!password) return res.status(400).send({ status: false, msg: "password is required" })
        if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/))
            return res.status(400).send({ status: false, msg: "this is not valid password" })

        if (!address) return res.status(400).send({ status: false, msg: "address is required" })


        if(Object.keys(document.address).length==0) return res.status(400).send({ status: false, message: "Address cannot be empty String & number" });

        if (typeof document.address !="object") return res.status(400).send({ status: false, msg: "Address body  should be in object form" });

        if (address) {
            if (!validator.isValid(address.street)) {
                return res.status(400).send({ status: false, message: "Street address cannot be empty" })
            }
            if (!validator.isValid(address.city)) {
                return res.status(400).send({ status: false, message: "City cannot be empty" })
            }
            if (!validator.isValid(address.pincode)) {
                return res.status(400).send({ status: false, message: "Pincode cannot be empty" })
            }
            let pincode = document.address.pincode

            if (!/^[1-9][0-9]{5}$/.test(pincode)) return res.status(400).send({ status: false, msg: " Please Enter Valid Pincode Of 6 Digits" });




        }


        let savedData = await userModel.create(document)
        return res.status(201).send({ status: true, data: savedData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {

        let { email, password } = req.body;

        if (!email) { return res.status(400).send({ status: false, message: ' email cant be empty' }); }

        if (!password) { return res.status(400).send({ status: false, message: ' password cant be empty' }); }

        let user = await userModel.findOne({ email: email, password: password })

        if (!user) {
            return res.status(400).send({ status: false, message: ' please provide valid userId or password' });
        }
        // let token=jwt.sign({
        //     userId:user._id.toString(),
        //     iat: Date.now(),
        //     exp:Date.now(),
        //     batchName:"plutonium"
        // },
        //     "GroupNo55"
        //     )
        //     let token = jwt.sign({userId: user._id.toString(),iat: Math.floor(Date.now() / 1000) },"Group55-book/Management", {expiresIn: '1h'});
        //  res.setHeader("x-api-key", token)

        //         res.setHeader("x-auth-key",token)

        let token = jwt.sign({
            userId: user._id
        },
            "GroupNo55", {
            expiresIn: "10m"
        },)
        let decode = jwt.verify(token, "GroupNo55")

        res.setHeader("header", token)

        res.status(201).send({ status: true, message: "Sucessfully Login", data: token, userId: decode.userId, iat: Date.now(), exp: decode.exp })


    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });

    }
}



module.exports.createUserDocument = createUserDocument
module.exports.loginUser = loginUser


