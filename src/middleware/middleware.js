const jwt = require('jsonwebtoken')
const bookModel = require("../models/bookModel")


const authentication = async function(req , res ,next){
try{
    let token = req.headers["x-auth-token"||"X-Auth-Token"]

    if(!token) return res.status(400).send({ status:false,msg:"token is required" })

    let decodedtoken = jwt.verify(token, "GroupNo55" )
    if(!decodedtoken) return res.status(400).send({ status:false, msg: "invalid token" })
    req.decodedtoken = decodedtoken
    next()

} catch (error){

    res.status(500).send({status:false,message: error.message})
}

}

  const authorization=async function(req,res,next) {
    try {
        
        
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        
    }
  }
  



module.exports.authentication = authentication