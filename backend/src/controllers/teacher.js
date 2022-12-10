const teacherModel = require("../models/teacherModel");


module.exports = {
    RegisterTeacher: async (req, res) => {
        const findEmail = await teacherModel.findOne({ email: req.body.email })
        if (findEmail) return res.send("User Already exists")
        await teacherModel.create(req.body)
        res.send({ message: "Successfully Registred !" })
    },
    LoginTeacher: async (req, res) => {
        const findEmail = await teacherModel.findOne({ email: req.body.email, password: req.body.password })
        if (!findEmail) return res.send("Enter a valid user id")
        res.send("Registred")
    },
}