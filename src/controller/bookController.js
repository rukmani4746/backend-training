const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const reviewModel = require('../models/reviewModel')
const mongoose = require('mongoose')
const validator = require('../validator/validator')

const createBook = async function(req , res){
    try{
const data = req.body
let {title ,excerpt, userId,category,subcategory,releasedAt,ISBN,} = data

if(Object.keys(data).length === 0) return res.status(400).send({status:false,msg: "body should be present"})

if(!title) return res.status(400).send({status : false , msg : "title is required"})
const titleUnique = await bookModel.findOne({title:title})
if(titleUnique) return res.status(400).send({status:false , msg:"title is already exist"})
//  if(!validator.isTitleValid(title)) return res.status(400).send({status: false , msg: "title is not valid"})

if(!excerpt) return res.status(400).send({status : false , msg : "excerpt is required"})


if(!userId) return res.status(400).send({status : false , msg : "userId is required"})

if(!ISBN) return res.status(400).send({status : false , msg : "ISBN code is required"})
if(!validator.isValidISBN(ISBN)) return res.status(400).send({status:false , msg:"ISBN is not valid"})
const ISBNunique = await bookModel.findOne({ISBN:ISBN})
if(ISBNunique) return res.status(400).send({status:false,msg:"ISBN is already exist"})

if(!category) return res.status(400).send({status : false , msg : "category is required"})

if(!subcategory) return res.status(400).send({status : false , msg : "subcategory is required"})

if(!releasedAt) return res.status(400).send({status : false , msg : "releasedAt is required"})
if(!validator.isValidreleasedAt(releasedAt)) return res.status(400).send({status:false , msg:"releasedAt is not in correct format"})


const savedData = await bookModel.create(data) 
return res.status(201).send({status:true,data:savedData})

    }

    
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getbooks=async function(req,res){
    try {
        let data=req.query;
        let filter = { isDeleted: false,...data };
        let findBooks = await bookModel.find(filter).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, _id: 1 }).sort({ title: 1 })
        if(!findBooks.length==0){return res.status(404).send({ status:false, message: 'Zero book found'})}
        return res.status(200).send({ status: true, message: 'Books list created', data: findBooks })
       
    } catch (errors) {
        res.status(500).send({msg:errors.messag,status:false});
    }
}


const getBooksById = async function (req, res) {
    try {
      
        let bookId = req.params.bookId
        
        if (!bookId) {
            return res.status(400).send({ status: false, message: " BOOK ID REQUIRED" })
        }

     
        const result = await bookModel.findOne({ _id: bookId,isDeleted:false })

        if (!result) {
            return res.status(404).send({ status: false, message: " BOOK Not found" })
        }
  
        let getreview = await reviewModel.find({ bookId: bookId })

        res.status(200).send({ status: false, message: "BooksList", data: { ...result.toObject(), reviewsData: getreview } })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}





module.exports = {createBook,getbooks,getBooksById}