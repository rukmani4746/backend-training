const mongoose = require("mongoose");

const User = require("../models/userModel");

const postShema = new mongoose.Schema({
    captions: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
})

const Post = new mongoose.model("POST",postShema);
module.exports = Post;