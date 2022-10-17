const cartModel = require("../models/cartModel")
const userModel = require('../Models/userModel')
const { isValidObjectId, isValidRequestBody, isValid, isValidName, isValidPrice } = require("../validator/validator")






















//<<-----------------------------------------------Delete Cart  -------------------------------------------------------->>

const deleteCart = async (req, res) => {

    try {
        let userId = req.params.userId
        if (!userId) return res.status.send({ status: false, message: "userId is required in path params" })

        if (!isValidObjectId(userId.trim())) { return res.status(400).send({ status: false, message: `${userId} is Invalid UserId ` }) }

        if (userId != req.userId) return res.status(403).send({ status: false, message: "Unauthorized access!" });

        const userData = await userModel.findById(userId)
        if (!userData) return res.status(404).send({ status: false, message: `No user data found for this ${userId}` })

        //cart validation
        let isCart = await cartModel.findOne({ userId: userId });
        if (!isCart) {
            return res.status(404).send({ status: false, message: "This Cart is Already Deleted" });
        } else {

            //cart deleting means array of items is empty, totalItems is 0, totalPrice is 0
            isCart.totalItems = 0;
            isCart.totalPrice = 0;
            isCart.items = [];

            let delCart = await cartModel.findOneAndUpdate(
                { userId: userId },
                { $set: isCart },
                { new: true }
            );
            return res.status(204).send({ status: true, message: "Cart Deleted Succesfully", data: delCart, });
        }
       
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {deleteCart}