const jwt = require('jsonwebtoken')
const bookModel = require("../models/bookModel")
// const mongoose = require('mongoose')

// const authentication = async function(req , res ,next){
// try{
//     let token = req.headers["x-auth-token"||"X-Auth-Token"]

//     if(!token) return res.status(400).send({ status:false,msg:"token is required" })

//     let decodedtoken = jwt.verify(token, "Group55" )
//     if(!decodedtoken) return res.status(400).send({ status:false, msg: "invalid token" })
//     req.decodedtoken = decodedtoken
//     next()

// } catch (error){

//     res.status(500).send({status:false,message: error.message})
// }

// }
// const authorization=async function(req,res,next) {
//   try { 
//       const bookId=req.params.bookId;
//       if(!mongoose.Types.ObjectId.isValid(bookId)){      
//           req.status(400).send({status:false,messege:"plese provide bookId"});
//       }
//       let data=await bookModel.findById(bookId);
//       if(!data){
//           req.status(400).send({status:false,messege:"provide valid bookId"});
//       }
//       const token =req.headers["x-api-key"];
//       const decodedToken=jwt.verify(token,"Group55");
//       if(!decodedToken) return res.send(400).send({status:false,msg:"heelo are you not jwt.verify"})   //iss me dikkat hai 
   
//       if(data.userId==req.decodedToken.userId){
//           next();
//       }else{
//           res.status(403).send({status:false,messsege:"authorization failed"});
      
//   }
      
//   } catch (error) {
//       res.status(500).send({status:false,message:error.message})
      
//   }
// }


// module.exports = {authentication,authorization}

// const jwt = require('jsonwebtoken')
// const bookModel = require("../models/bookModel")   


const authentication = (req,res,next)=>{
    try{
    //FETCH TOKEN FROM HEADER---- 
    let token = req.headers["x-auth-token"||"X-Auth-Token"]
    if (!token) {
       return res.status(400).send({ status:false,message: "no token found" })
    }

    // DECODE TOKEN FETCH BY FROM HEADER----
    let decodedToken = jwt.verify(token, "Group55")
    if(!decodedToken){
       return res.staus(401).send({status:false,message:"Invalid token"})
    }
    req.decodedToken=decodedToken
   
    next();
}catch(err){
    res.status(500).send({status:false,message:err.message})
}
}

const authorization=async (req, res, next)=>{
    try{
    //FETCH TOKEN FROM HEADER----
    let token = req.headers["x-auth-token"||"X-Auth-Token"]
    if (!token) {
     return   res.status(400).send({ status:false,message: "no token found" })
    }

    // DECODE TOKEN FETCH BY FROM HEADER----
    let decodedToken = jwt.verify(token, "Group55")
    if(!decodedToken){
      return  res.staus(401).send({status:false,message:"Invalid token"})
    }
    // FETCH BOOK ID PRESENT IN PARAMS----
    let Id = req.params.bookId

    // FIND BOOK DOCUMENT BY BOOK ID-----
    let Book = await bookModel.findOne({_id:Id})
    
    if(!Book){
      return  res.status(404).send({status:false, message:"No book found with given Id" })
    }

    // MATCH THE USER-ID PRESENT IN TOKEN AND USER-ID PRESENT IN BOOK-ID-----
    if(decodedToken.userId != Book.userId){
       
       return res.status(403).send({status:false, message:"User Not authorized!" })
    }
    next()
}catch(err){
    res.status(500).send({status:false,message:err.message})
}
}

// MAKE MODULE PUBLIC AND EXPORT FROM HERE-----
module.exports={authentication, authorization}
