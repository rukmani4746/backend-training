const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const regEx = /^[a-zA-Z ]*$/;
const regexNumber = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
const regexMail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const isValidation = function (value) {
  if (typeof value == 'undefined' || value == null) return false
  if (typeof value == "string" && value.trim().length == 0) return false
  return true
}


const createInternData = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin','*')
  try {
    let data = req.body
    let { name, email, mobile,CollegeName} = data
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "body should not be empty" })
    }
    if (!name) return res.status(400).send({ status: false, msg: "name is required" })
    if (!isValidation(name)) return res.status(400).send({ status: false, msg: "name should be valid" })
    if (!regEx.test(name)) {
      return res.status(400).send({ status: false, msg: "name must be in alphabet" })
    }
    let search = await internModel.findOne({ name: name })
    if (search) {
      return res.status(400).send({ status: false, msg: "  name is already registered " })
    }
    if (!mobile) return res.status(400).send({ status: false, msg: "mobile is required" })
    if (!regexNumber.test(mobile)) {
      return res.status(400).send({ status: false, msg: "mobile number must be more than 10 digit" })
    }
    search = await internModel.findOne({ mobile: mobile })
    if (search) {
      return res.status(400).send({ status: false, msg: "  mobile number is already registered " })
    }
    if (!email) return res.status(400).send({ status: false, msg: "email is required" })

    if (!regexMail.test(email)) {
      return res.status(400).send({ status: false, msg: "this is  not a valid email " })
    }
    search = await internModel.findOne({ email: email })
    if (search) {
      return res.status(400).send({ status: false, msg: " email is already registered " })
    }
   
    let findClgNm = await collegeModel.findOne({$or:[{name:CollegeName},{fullName:CollegeName}]})
    
    let newData1 = { name: name, email:email, mobile:mobile, collegeId: findClgNm._id}
      let saveData = await internModel.create(newData1)
    return res.status(200).send({ status: true, msg: " intern created suceesfully", data: saveData})

  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message })

  }
}


const getCollegeDetails = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin','*')
  try {
    let { CollegeName } = req.query
    let findNminClgdb = await collegeModel.findOne({ name: CollegeName })
    if (!findNminClgdb)
      return res.status(404).send({ status: false, message: "no intern found" })
      if (!regEx.test(CollegeName)) {
        return res.status(400).send({ status: false, message: "name must be in alphabet" })
      }

    let findIntern = await internModel.find({ collegeId: findNminClgdb._id ,isDeleted:false},'-collegeId -isDeleted -createdAt -updatedAt -__V').sort({createdAt: -1})

if(findIntern.length>0)findNminClgdb.interns = findIntern
if(findIntern.length == 0)findNminClgdb.interns = "intern not found"

    let newObj = {name:findNminClgdb.name,fullName:findNminClgdb.fullName,logoLink:findNminClgdb.logoLink,interns:findNminClgdb.interns}
    res.status(200).send({status:true,data:newObj})


    }

  catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
}



module.exports.intern = createInternData
module.exports.getCollegeDetails = getCollegeDetails