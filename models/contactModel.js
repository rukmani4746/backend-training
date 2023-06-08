const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Contacts = new mongoose.model("CONTACT",contactSchema);
module.exports = Contacts;