const jwt = require("jsonwebtoken")

const authenticate = function(req, res, next) {
    //check the token in request header
   try {
    
     let token = req.headers["x-auth-token"];
     if (!token) return res.send({ status: false, msg: "token must be present" });
    
     //validate this token
     
     let decodedToken = jwt.verify(token, "functionup-thorium");
     if (!decodedToken)
       return res.send({ status: false, msg: "token is invalid" });
 
     next()
   } catch (error) {
    return res.status(500).send(error.message)
   }
}


const authorise = function(req, res, next) {
    let userToBeModified = req.params.userId
    let toks = req.headers["x-auth-token"]

    let decodedToken = jwt.verify(toks,"functionup-thorium")
    let userLoggedIn = decodedToken.userId
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
    next()
}
module.exports.abc = authenticate
module.exports.authorise = authorise