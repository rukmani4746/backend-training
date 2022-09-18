const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        reuired: true,
        unique: true,
        trim: true

    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
         
        //validate:{
            //validator: function (str) {
              //  return /\d{10}/.test(str);
           // },
          //  message: props => `${props.value} is not a valid phone number!`
       // }
    },
    collegeId : {
        type: ObjectId,
        required: true,
        ref: "College"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


module.exports = mongoose.model("Intern", internSchema)