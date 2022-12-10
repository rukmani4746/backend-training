const { default: mongoose } = require("mongoose");

const TeacherSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Teacher", TeacherSchema)