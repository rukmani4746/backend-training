const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {type:String,required:true}, 
    authorName: String, 
    tags: [String],

    year:{type:Number,default:2021},
    
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    totalPages:Number,
    stockAvailable:Boolean
   
}, 
{ timestamps: true });

 // sales: {type: Number, default: 10}
module.exports = mongoose.model('Book1', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
