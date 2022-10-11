const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    try {
        let gettingToken = req.headers.authorization
        console.log(gettingToken)
        if (!gettingToken) {
            return res.status(400).send({ status: false, msg: "token must be present" });
        }
        const token = gettingToken.substring(6)
        jwt.verify(token, "FunctionUp Group No 26", (err, decodedToken) => {
            if (err) {
                return res.status(401).send({ status: false, message: "token is not valid" })
            }
            req.userId = decodedToken.userId
            //Set an attribute in request object 
            next();
        })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }
};









module.exports = { authentication }