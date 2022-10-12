const productModel = require("../models/productModel");
const { isValidObjectId } = require("../validator/validator")
const aws = require("../aws/aws")







//<<-----------------------------------------------Create Product-------------------------------------------------------->>
//Nirdosh

const createProducts = async (req, res) => {
    try {
        let data = req.body;
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, message: 'No data provided' }) }

        const newUser = await productModel.create(data);

        return res.status(201).send({ status: true, message: 'success', data: newUser })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



//<<-----------------------------------------------Get Product  -------------------------------------------------------->>
//Salman

const getProductByFilter = async (req, res) => {
    try {

        if (Object.keys(req.query).length==0) {
            console.log(req.query)
            let productData = await productModel.find({ isDeleted: false })

            if (!productData) return res.status(404).send({ status: false, message: `No Product data found` })

            return res.status(200).send({ status: true, message: 'Success', data: productData })
        }
        const { size, name, priceGreaterThan, priceLessThan } = req.query



        //finding data from DB
        const getData = await productModel.find(req.query)
        if (getData.length == 0) return res.status(404).send({ status: false, message: "No Data Found With These Filters" });

        return res.status(200).send({ status: true, data: getData });
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }

}





//<<-----------------------------------------------Get Product  -------------------------------------------------------->>
//Rukmani

const getProductById = async (req, res) => {
    try {
        let productId = req.params.productId
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, msg: "Product id is not in correct format" })

        const result = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!result) return res.status(404).send({ status: false, msg: "no product available with this product Id" })

        return res.status(200).send({ status: true, msg: "productList", data: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//<<-----------------------------------------------update Product  -------------------------------------------------------->>
//Ashutosh

const updateProduct = async (req, res) => {

}







//<<-----------------------------------------------Delete Product  -------------------------------------------------------->>
//Rukmani || Ashutosh
const deleteProductById = async (req, res) => {

}


module.exports = { createProducts, getProductByFilter, getProductById, updateProduct, deleteProductById };