const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fname: { type: string, require: true },
    lname: { type: string, require: true },
    email: { type: string, require: true, unique: true },
    profileImage: { type: string, require: true },
    phone: { type: string, require: true, unique: true },
    password: { type: string, require: true },
    address: {
        shipping: {
            street: { type: string, require: true },
            city: { type: string, require: true },
            pincode: { type: string, require: true }
        },
        billing: {
            street: { type: string, require: true },
            city: { type: string, require: true },
            pincode: { type: string, require: true }
        }
    }},{timestamps:true}
)

module.exports = mongoose.model("user",userSchema)