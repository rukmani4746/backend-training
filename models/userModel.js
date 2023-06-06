const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
    name:{
type: String,
required: true,
    } ,
    email: {
      type: String,
      required: true,
      unique:true
    },
    mobile:{
      type:  String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    answer: {
      type:String,
      required: true,
    },
  },{
    timestamps:true
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User