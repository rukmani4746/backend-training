const { count } = require("console")
const BookModel= require("../models/bookModel")
const UserModel=require("../models/userModel")
const AuthorModel= require("../models/authorModel1")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const createAuthor=async function (req,res){
    let data =req.body
let savedData=await AuthorModel.create(data)
res.send({msg:savedData})
}

const listBook=async function(req,res){
    let findAuthor=await AuthorModel.find({author_name:"Chetan Bhagat"});
    let findBook=await BookModel.find({author_id:{$eq:findAuthor[0].author_id}});
    res.send({msg: findBook});
}
 const getBooksData= async function (req, res) {
     let allBooks= await BookModel.find( {authorName : "HO" } )
     console.log(allBooks)
     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
     else res.send({msg: "No books found" , condition: false})
 }


const updateBooks= async function (req, res) {
    let bookPrice =await BookModel.findOneAndUpdate({name:"two states"},{$set:{price:100}},{new:true});

    // let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    // let allBooks= await BookModel.findOneAndUpdate( 
        // { authorName: "ABC"} , //condition
        // { $set: data }, //update in data
        // { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
    //  )
     
     res.send( { msg: allBooks})
}

const deleteBooks= async function (req, res) {
    // let data = req.body 
    let allBooks= await BookModel.updateMany( 
        { authorName: "FI"} , //condition
        { $set: {isDeleted: true} }, //update in data
        { new: true } ,
     )
     
     res.send( { msg: allBooks})
}




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.updateBooks= updateBooks
module.exports.deleteBooks= deleteBooks
module.exports.createAuthor=createAuthor
module.exports.listBook =listBook