const mongoose = require("mongoose")
const ObjectId= mongoose.Schema.Types.ObjectId

const internSchema = mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    // collegeId:{
    //     type:ObjectId,
    //     ref:"College",
    // },
    collegeName:
    {
        type:String,

    },
    isDeleted: {
        type:Boolean,
         default: false}
        },
 {timeStamp:true})

module.exports = mongoose.model("Intern", internSchema)