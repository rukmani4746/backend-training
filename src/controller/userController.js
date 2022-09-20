// const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
// const reviewModel = require('../models/reviewModel')
const validator = require('../validator/validator')
const jwt = require('jsonwebtoken')


let createUserDocument = async function (req, res) {
    try {


        let document = req.body
        let { title ,name , phone , email , password , address } = document

        if (Object.keys(document).length === 0) return res.status(400).send({status:false ,msg:"require data to create document"})

        if(!title) return res.status(400).send({status:false,msg:"title must be present"})
        if(!validator.isTitleValid(title)) return res.status(400).send({status: false , msg: "title is not valid"})

      if(!name) return res.status(400).send({status: false,msg:" name is required "})
      if(!validator.isValid(name)) return res.status(400).send({status: false , msg: "name is not valid"})

      if(!phone) return res.status(400).send({status:false,msg:"phone number is not present"})
      if(!validator.isPhoneValid(phone)) return res.status(400).send({status: false , msg: "number is not valid"})

      const isUniquePhoneNumber = await userModel.findOne({phone:phone})
      if(isUniquePhoneNumber) return res.status(400).send({status: true , msg: "phone number is already registerd"})

      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))

      if(!email) return res.status(400).send({status:false,msg:"emailId is not present"})
    //   if(!validator.isEmailValid(email)) return res.status(400).send({status: false , msg: "email is not valid"})
   
      const isUniqueEmail = await userModel.findOne({email:email})
      if(isUniqueEmail) return res.status(400).send({status: true , msg: "emailId id is already registerd"})

      if(!password) return res.status(400).send({ status: false , msg: "password is required"})
      if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/))

      if(!address) return res.status(400).send({ status: false , msg: "address is required"})


   let savedData = await userModel.create(document)
       return res.status(201).send({status:true, data: savedData })
  }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

    const loginUser=async (req, res)=>{
        try {
    
        let { email, password } =req.body;
    
        if (!email){ return res.status(400).send({ status:false, message: ' email cant be empty' });} 
    
        if (!password){return res.status(400).send({ status:false, message: ' password cant be empty' });} 
    
        let emailpasswordcheck = await userModel.findOne({email:email,password:password})
    
        if(!emailpasswordcheck){return res.status(400).send({ status:false, message: ' plz provide valide email and password' });}
        let token=jwt.sign({ userid:emailpasswordcheck._id .toString()},"GroupNo55",{expiresIn:"2hr"}) 
        res.status(201).send({ status:true,message:"Sucessfull Login", data:{token:token}
        
    })}
    catch (error) {
        return res.status(500).send({ status:false, message: error.message });
        
    }
    }



module.exports.createUserDocument = createUserDocument
module.exports.loginUser = loginUser


