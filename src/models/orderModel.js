const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
    // _id: ObjectId("61951bfa4d9fe0d34da86344"),
	userId: String,
	productId: String,
	amount: Number,
	isFreeAppUser: Boolean, 
	date: Number,

    // author_id : Number,
    // author_name: String,
    // age: Number,
    // address: String

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)
