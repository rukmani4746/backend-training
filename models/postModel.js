const mongoose = require("mongoose");

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
})

const Post = new mongoose.model("POST",postShema);
module.exports = Post;