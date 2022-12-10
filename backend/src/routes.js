const express = require("express")
const { LoginTeacher, RegisterTeacher } = require("./controllers/teacher")
const router = express.Router()

router.post("/register",RegisterTeacher)
router.post("/login",LoginTeacher)
module.exports = router