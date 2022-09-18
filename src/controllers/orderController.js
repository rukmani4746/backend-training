const { count } = require("console")
const orderModel= require("../models/orderModel")
const userModel = require("../models/userModel")

const createOrder= async function (req, res) {
    let data = req.body
    // let userid = data.userId
    // let productid=data.productId
    let header=req.headers.isfreeappuser
    if(!header)
     return res.send("header is not present")

    
    if(!data.userId)
return res.send("userid is not present")

    
    if(!data.productId)
        return res.send("productid is not present")
    
        let userdata = await userModel.findById(userid)
    
    
    if(!orderId) return res.send({msg: 'orderId is mandatory in the request'})

    let savedData= await orderModel.create(data)
    res.send({data: savedData})

}

module.exports.createOrder= createOrder
