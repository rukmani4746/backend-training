const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
// const moment = require('moment')

module.exports = {
    createUser: async (req, res) => {
       
        try {
            let checkunique = await userModel.findOne({ phone: req.body.phone })
            if (checkunique) return res.status(400).send({ msg: "Mobile number Already exists!" })
            let checkunique_email = await userModel.findOne({ email: req.body.email })
            if (checkunique_email) return res.status(400).send({ msg: "Email Address Already exists!" })
            let obj = { street: req.body.address, city: req.body.city, pincode: req.body.pincode, }
            req.body.address = obj
           
            let createUserdata = await userModel.create(req.body)
            res.status(201).send({ data: createUserdata })
        }
        catch (error) {
            console.log(error.message)
            res.status(500).send({ status: false, message: error.message })
        }
    },

    login: async (req, res) => {
        try {
            console.log(req.body);
            let data = req.body
            let { email, password } = data

            let findUser = await userModel.findOne({ email: email, password: password });
            if (!findUser) return res.status(404).send({ status: false, message: "emailId or password is incorrect" })

            let token = jwt.sign({
                userId: findUser._id
            },
                "secret-Hai-ye-batan-mat", { expiresIn: "1s" })
            let decode = jwt.verify(token, "secret-Hai-ye-batan-mat")

            res.setHeader("header", token)
            res.status(200).send({ Message: "LoggedIn successfully", data: token, userId: decode.userId, iat: decode.iat, exp: decode.exp })
        } catch (err) {
            return res.status(500).send({ status: false, message: err.message })
        }
    }
}