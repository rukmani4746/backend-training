const jwt = require("jsonwebtoken")
const bloggerModel = require("../model/blogModel");


//      authentication    //

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if(!token) return res.status(403).send({status:false, msg:"required token"})
        jwt.verify(token, "mini-project", function (error, decoded) {
            if (error) {
                return res.status(401).send({ msg: error.message })
            }
            req.token = decoded
            
            next()
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//      authrorization for path param    //

const authorization = async function (req, res, next) {
    try {

        let blogId = req.params.blogId
        let blogg = await bloggerModel.findById(blogId)
        if (!blogg) {
            return res.status(400).send({ status: false, msg: "please enter valid Id or token"})
        }
        let author_Id = blogg.authorId.toString()
        let userToken = req.token.authorId
        if(author_Id !== userToken) {
            return res.status(403).send({ status: false, msg: "you are not authorised" })
        }
        next()
    } catch (error) {
        return res.status(500).send(error.message)

    }
}

module.exports = {authentication, authorization}






