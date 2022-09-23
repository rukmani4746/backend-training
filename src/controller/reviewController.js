const reviewModel = require('../models/reviewModel')
const bookModel = require('../models/bookModel')
// const mongoose = require('mongoose')
const validator = require('../validator/validator')


// const createReview = async function(req,res){
//     try{
//         let bookId = req.params.bookId
// if(!mongoose.Types.ObjectId.isValid(bookId)) 
//     return res.status(400).send({status:false,msg:"invalid bookId"})
//  let findBookId = await bookModel.findOne({_id:bookId,isDeleted:false})
//  if(!findBookId) return res.status(400).send({status:false,msg:"id is not present with the given filter"})
// }
//     catch(error){

//         return res.status(500).send({status:false,message:error.message})

//     }
// }


const createReview = async function (req, res) {
    try {

        let data = req.body
        let bookId = req.params.bookId

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter the data in the request body to update" })
        }
           data.bookId = bookId

        let checkBookId = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!checkBookId) return res.status(404).send({ status: false, message: "Book doesn't exist" })

        if (data.reviewedBy !== undefined) {
            if (!validator.isValid(data.reviewedBy)) {
                return res.status(400).send({ status: false, message: "Name shouldn't be blank" })
            } 
            if(!validator.alphabetTestOfString(data.reviewedBy)){
                return res.status(400).send({ status: false, message: "Enter a valid name" })
            }
        }

        data.reviewedAt = Date.now();

        if (data.review !== undefined) {
            if (!validator.isValid(data.review)) {
                return res.status(400).send({ status: false, message: "Write review properly" })
            }
        }

        if (!data.rating) 
        return res.status(400).send({ status: false, message: "You must give rating of this book." })

        if (typeof data.rating != 'number' || data.rating < 1 || data.rating > 5) {
            return res.status(400).send({ status: false, message: 'Rating should be a number between 1 to 5' })
        }

        const updatedBooks = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: 1 } }, { new: true })

        let createdReview = await reviewModel.create(data)
        let updatedBooksdata = { updatedBooks }

        updatedBooksdata.reviewsData = createdReview
        return res.status(201).send({ status: true, message: 'Success', data: updatedBooksdata })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



module.exports.createReview = createReview