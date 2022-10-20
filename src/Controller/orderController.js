//<<-----------------------------------------------Importing Modules -------------------------------------------------------->>
const userModel = require('../Models/userModel')

const validator = require("../validator/validator")
const {  isValidObjectId } = require("../validator/validator")

const orderModel = require('../Models/orderModel')
const cartModel = require('../models/cartModel')

///////////////****************/ POST-Create API (ORDER) *******************/////////////////////////////////
const createUserOrder = async function (req, res) {
    try {
        const userId = req.params.userId
        const cartId = req.body.cartId

        // userId and jwt match
        if (!userId) return res.status(400).send({ status: false, message: "userId is required in path params" })
        if (!isValidObjectId(userId.trim())) { return res.status(400).send({ status: false, message: `${userId} is Invalid UserId ` }) }
        if (userId != req.userId) return res.status(403).send({ status: false, message: "Unauthorized access!" });

        if (!cartId) return res.status(400).send({ status: false, message: "cartId is required in body" })
        if (!isValidObjectId(cartId.trim())) { return res.status(400).send({ status: false, message: `${cartId} is Invalid cartId ` }) }

        // user exists or not
        const userData = await userModel.findById(userId)
        if (!userData) return res.status(404).send({ status: false, message: `No user data found for this ${userId}` })

        // cart exists or not - cart - user relation
        const cartData = await cartModel.findOne({ _id: cartId, userId: userId }).populate("items.productId")
        if (!cartData) return res.status(404).send({ status: false, message: `No cart data found for this ${cartId}` })

        const { items, totalPrice, totalItems } = cartData;

        // calculate totalQuantity
        let totalQuantity = 0;
        for (const item of items) {
            totalQuantity += item.quantity
            
        }

        // create order
        const order = await orderModel.create({
            userId: userId,
            items: items,
            totalPrice: totalPrice,
            totalItems: totalItems,
            totalQuantity: totalQuantity
        })

        // remove cart
        await cartData.remove();

        return res.status(200).send({ status: true, message: "Order created successfully", data: order })
    }
    catch (err) {
        cosole.log(err.message)
        res.status(500).send({ status: false, message: err.merssage })
    }
}

module.exports = { createUserOrder }