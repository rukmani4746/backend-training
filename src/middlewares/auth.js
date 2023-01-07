const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
module.exports = {
    authontication: (req, res, next) => {
        try {
            let token = req.headers['x-auth-token']
            if (!token) { return res.status(400).send({ status: false, message: "Token is missing" }) }
    
            jwt.verify(token, "secret-Hai-ye-batan-mat", function (error, decodedToken) {    
                if (error) {
                  
                    return res.status(403).send({ status: false, msg: error.message })
                }
                // if (Date.now() > decodedToken.payloadDetails.exp) {
                //     return res.status(401).send({
                //         status: false,
                //         message: "Token is Expired",
                //     })
                // }
             req.decodedToken = decodedToken
            //   console.log(decodedToken)
               next()
            })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
     
    
    // const authontication = async function(req,res,next){
    //     // try{
    //      let token= req.headers["X-auth-token"];
    //      if(!token) token= req.headers["x-auth-token"]
    //      if (!token) return res.send({ status: false, message: "token must be present" }); 
    //      jwt.verify(token, "secret-Hai-ye-batan-mat",function (err, decoded) {
    //         if (err) {
    //              return res.status(401).send({ status: false, message: err.message })
    //         } else {
    //             console.log(decoded)
    //             req.decodedToken=decoded
    //             next()
    //         }
    //     })
    // }
    


  authorise : async (req, res, next) => {
    try {
        let ObjectID = mongoose.Types.ObjectId
        if (req.body.userId) {
            let {userId} = req.body
            if (!ObjectID.isValid(userId)) { return res.status(401).send({ status: false, message: "Not a valid UserID" }) }
            if (userId !== req.decodedToken.userId) {
                return res.status(403).send({ status: false, message: "You are not a authorized user" })
            }
            return next()
        }  
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
}
