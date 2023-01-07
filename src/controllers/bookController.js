const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const reviewModel = require("../models/reviewModel")


const createBook = async (req, res) => {
    try {

        let userid = await userModel.findOne({ name: req.body.authorname })

        let uniqueisbn = await bookModel.findOne({ ISBN: req.body.ISBN })
        if (uniqueisbn) return res.status(400).send({ status: false, message: "ISBN is already present" })

        req.body.userId = userid._id

        req.body.releasedAt = new Date().toDateString()
        let saveData = await bookModel.create(req.body)
        return res.status(201).send({ status: true, message: "data created successfully", data: saveData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
//  GET BOOK BY QUERY FILTER
const getBooks1 = async (req, res) => {
    try {

        let { userId, category, subcategory } = req.query
        let obj = { isDeleted: false }
        if (userId) obj.userId = userId
        if (category) obj.category = category

        if (subcategory)
            subcategory = subcategory.split(",")
        obj.subcategory = subcategory

        let findData = await bookModel.find(obj).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })
        if (findData.length == 0)
            return res.status(404).send({ status: false, msg: " No Such Book found " })
        return res.status(200).send({ status: true, data: findData })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
// GET BOOK BY QUERY FILTER 

const getBook2 = async (req, res) => {
    try {
        let { bookId } = req.params

        let bookData = await bookModel.findOne({ isDeleted: false, id: bookId })
        if (!bookData) return res.status(404).send({ status: false, msg: "Book not found" })

        let reviewsData = await reviewModel.find({ isDeleted: false, _id: bookId }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0 })
        let finalData = {
            title: bookData.title, excerpt: bookData.excerpt, userId: bookData.userId,
            category: bookData.category, subcategory: bookData.subcategory, isDeleted: false, reviews: bookData.reviews,
            createdAt: bookData.createdAt, updatedAt: bookData.updatedAt, reviewsData: reviewsData
        }
        // releasedAt : bookData.releasedAt
        return res.status(200).send(finalData)

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createBook, getBooks1, getBook2 }

