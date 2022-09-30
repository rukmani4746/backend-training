const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const reviewModel = require('../models/reviewModel')
const validator = require('../validator/validator')
const mongoose = require('mongoose')
const moment = require('moment')
const aws = require("aws-sdk")


aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        let s3 = new aws.S3({ apiVersion: '2006-03-01' }); // we will be using the s3 service of aws

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",  //HERE
            Key: "abc/" + file.originalname, //HERE 
            Body: file.buffer
        }


        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }

            return resolve(data.Location)
        })

    })
}

const createBook = async function (req, res) {
    try {
        const data = req.body
        let { title, excerpt, userId, category, subcategory, releasedAt, ISBN, bookCover } = data
        let files = req.files
        if (files && files.length > 0) {
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            var uploadedFileURL = await uploadFile(files[0])

        }
        if (!bookCover) data.bookCover = uploadedFileURL


        //validations:-
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "body should be present" })
        if (!title) return res.status(400).send({ status: false, msg: "title is required" })
        const titleUnique = await bookModel.findOne({ title: title })
        if (titleUnique) return res.status(400).send({ status: false, msg: "title is already exist" })

        if (!excerpt) return res.status(400).send({ status: false, msg: "excerpt is required" })

        let isValid = mongoose.Types.ObjectId.isValid(userId);
        if (!isValid) {
            return res.status(400).send({ status: false, message: "Id is Not Valid" })
        }

        if (!userId) return res.status(400).send({ status: false, msg: "userId is required" })

        if (!ISBN) return res.status(400).send({ status: false, msg: "ISBN code is required" })
        if (!validator.isValidISBN(ISBN)) return res.status(400).send({ status: false, msg: "ISBN is not valid" })
        const ISBNunique = await bookModel.findOne({ ISBN: ISBN })
        if (ISBNunique) return res.status(400).send({ status: false, msg: "ISBN is already exist" })

        if (!category) return res.status(400).send({ status: false, msg: "category is required" })

        if (!subcategory) return res.status(400).send({ status: false, msg: "subcategory is required" })

        if (!releasedAt) return res.status(400).send({ status: false, msg: "releasedAt is required" })
        if (!validator.isValidreleasedAt(releasedAt)) return res.status(400).send({ status: false, msg: "releasedAt is not in correct format" })
        // if(!bookCover) return res.status(400).send({status:false,msg:"bookcover is required"})
        data.bookCover = uploadedFileURL

        //data created
        const savedData = await bookModel.create(data)
        return res.status(201).send({ status: true, data: savedData })

    }

    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getbooks = async function (req, res) {
    try {
        let data = req.query;
        let filter = { isDeleted: false, ...data };

        //validations
        if (data.title || data.excerpt || data.releasedAt || data.reviews || data._id) {
            return res.status(404).send({ Status: false, message: " You can't get data with given filter" })
        }

        if (data.userId && !mongoose.isValidObjectId(data.userId)) return res.status(400).send({ status: false, messege: "please provide valid userId" })
        if (data.userId) {
            const checkuserid = await userModel.findById(data.userId)
            if (!checkuserid) return res.status(400).send({ status: false, messege: "no books available with this userId" })
        }

        //getting books
        let result = await bookModel.find(filter).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, _id: 1 }).sort({ title: 1 });
        return res.status(200).send({ status: true, message: 'Book List', data: result })

    }
    catch (errors) {
        res.status(500).send({ msg: errors.messag, status: false });
    }
}

const getBooksById = async function (req, res) {
    try {

        let bookId = req.params.bookId
        //validation
        if (!bookId) {
            return res.status(400).send({ status: false, message: "put bookId to get details" })
        }
        let isValid = mongoose.Types.ObjectId.isValid(bookId);
        if (!isValid) {
            return res.status(400).send({ status: false, message: "Id is Not Valid" })
        }
        const result = await bookModel.findOne({ _id: bookId, isDeleted: false })

        if (!result) {
            return res.status(404).send({ status: false, message: "no book found with this bookId" })
        }
        let getreview = await reviewModel.find({ bookId: bookId })
        //getting books by Id
        return res.status(200).send({ status: true, message: "BooksList", data: { ...result.toObject(), reviewsData: getreview } })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const updateBooksById = async function (req, res) {
    try {

        let bookId = req.params.bookId
        let { title, excerpt, releasedAt, ISBN } = req.body
        //validation
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter the data in the request body to update" })
        }

        let uniqueTitle = await bookModel.findOne({ title: title })
        if (uniqueTitle) {
            return res.status(400).send({ status: false, message: "title already exists" })
        }
        let uniqueISBN = await bookModel.findOne({ ISBN: ISBN })
        if (uniqueISBN) {
            return res.status(400).send({ status: false, message: "ISBN already exists" })
        }

        if (!moment(releasedAt).format('YYYY-MM-DD')) {
            return res.status(400).send({ status: false, message: "please enter date format like this: YYYY-MM-DD" })
        }
        //updating
        let updatedData = await bookModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            {
                title: title,
                excerpt: excerpt,
                releasedAt: releasedAt,
                ISBN: ISBN,
            },
            { new: true }
        )

        return res.status(200).send({ status: true, message: "Data updated successfully", data: updatedData })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const deleteBooksById = async function (req, res) {
    try {
        let bookId = req.params.bookId;

        let deleteBook = await bookModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true }
        )
        //deletion
        return res.status(200).send({ status: true, message: "deletion successful", data: deleteBook })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { createBook, getBooksById, deleteBooksById, getbooks, updateBooksById }



