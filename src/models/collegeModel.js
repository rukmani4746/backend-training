const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
    name:{
        type:String,
        requried: true,
        unique:true
        //example: " "
    },
    FullName:{
        type:String,
        required:true
       // example:"https://functionup-stg.s3.ap-south-1.amazonaws.com/thorium/iitd.png"
    },
    logoLink: {
        type:String,
        requried:true
    },
    isDeleted: {
        type:Boolean,
        default:false 
    }
})

module.exports = mongoose.model("College", collegeSchema)