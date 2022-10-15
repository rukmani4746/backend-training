const productModel = require("../models/productModel");
const validator = require("../validator/validator.js");
const aws = require("../aws/aws")
const { isValidObjectId, isValidRequestBody, isValid, isValidImg, isValidName, isValidPrice,isValidSize, isValidDescrption } = require("../validator/validator")







//<<-----------------------------------------------Create Product-------------------------------------------------------->>

let createProducts = async (req, res) => {
    try {

        let data = req.body;
        let files = req.files;

        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Please provide data in body" });

        let { title, description, price, currencyId, currencyFormat, isFreeShipping, style, availableSizes, installments } = data;

        if (!title) return res.status(400).send({ status: false, message: "Title is Required" });

        if (!isValid(title)) return res.status(400).send({ status: false, message: "Title is in wrong format" });


        if (await productModel.findOne({ title: title })) return res.status(400).send({ status: false, message: "Title already exist" })


        if (!description) return res.status(400).send({ status: false, message: "Description is Required" });

        if (!isValidDescrption(description)) return res.status(400).send({ status: false, message: "description is in wrong format" });


        if (!price) return res.status(400).send({ status: false, message: "price is Required" });

        if (!isValidPrice(price)) return res.status(400).send({ status: false, message: "Price of product should be valid and in numbers" });

        data.price = (price*1).toFixed(2) 

        if (currencyId || typeof currencyId == 'string') {

            if (!isValid(currencyId)) return res.status(400).send({ status: false, message: " currencyId should not be an empty string" });

            if (!((/INR/.test(currencyId))&& currencyId.length==3)) return res.status(400).send({ status: false, message: " currencyId should be in 'INR' Format" });
        } else {
            data.currencyId = "INR"
        }

        if (currencyFormat || typeof currencyFormat == 'string') {

            if (!isValid(currencyFormat)) return res.status(400).send({ status: false, message: "Currency format of product should not be empty" });

            if (!((/₹/.test(currencyFormat))&& currencyFormat.length ==1)) return res.status(400).send({ status: false, message: "Currency format of product should be in '₹' only " });
        } else {
            data.currencyFormat = "₹"
        }


        if (isFreeShipping || typeof isFreeShipping == 'string') {
            if (!isValid(isFreeShipping)) return res.status(400).send({ status: false, message: "isFreeShipping should not contain white spaces" });
            if (typeof data.isFreeShipping == 'string') {

                data.isFreeShipping = isFreeShipping.toLowerCase().trim();
                if (isFreeShipping == 'true' || isFreeShipping == 'false') {

                    data.isFreeShipping = JSON.parse(data.isFreeShipping);
                } else {
                    return res.status(400).send({ status: false, message: "Please enter isFreeShipping value either 'true' or 'false'" })
                }
            }
        }


        if (files.length == 0) return res.status(400).send({ status: false, message: "ProductImage is required" });

        if (files && files.length > 0) {
            if (!isValidImg(files[0].mimetype)) { return res.status(400).send({ status: false, message: "Image Should be of JPEG/ JPG/ PNG" }); }
        }


        let productImgUrl = await aws.uploadFile(files[0]);
        data.productImage = productImgUrl;


        if (style) {
            if (!isValid(style) || !isValidName(style)) return res.status(400).send({ status: false, message: "Style should be valid an does not contain numbers" });
        }

        if (!availableSizes) return res.status(400).send({ status: false, message: " availableSizes is Required" });


        if (availableSizes) {
            // let size = availableSizes.toUpperCase().split(",")
            let size = availableSizes.replace(/\s+/g, "").toUpperCase().split(",").map(String)
            data.availableSizes = size;


            for (let i = 0; i < data.availableSizes.length; i++) {
                if (!isValidSize(data.availableSizes[i])) {
                    return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" });
                }
            }
        }
        if (installments || typeof installments == 'string') {
            if (!isValidPrice(installments)) return res.status(400).send({ status: false, message: "Installments should be in number" });
            data.installments = Math.round(installments)
        }

        let createProduct = await productModel.create(data);
        return res.status(201).send({ status: true, message: "Success", data: createProduct });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//<<-----------------------------------------------Get Product  -------------------------------------------------------->>

const getProductByFilter = async (req, res) => {
    try {
        let data = { isDeleted: false }
        if (Object.keys(req.query).length === 0) {
            let productData = await productModel.find(data).sort({price: 1})

            if (productData.length ==0) return res.status(404).send({ status: false, message: `No Product data found` })

            return res.status(200).send({ status: true, message: 'Success', data: productData })
        }
        let { size, name, priceGreaterThan, priceLessThan, priceSort} = req.query
        

        //filtering through size key(availableSizes)
        if (size != null) {
            if (size.length > 0) {
                if (!isValid(size)) return res.status(400).send({ status: false, message: "Please Enter Size Value " });
                size = size.replace(/\s+/g, "").toUpperCase().split(",").map(String);
                for (let i = 0; i < size.length; i++) {
                    if (!isValidSize(size[i])) {
                        return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" });
                    }
                }
                data["availableSizes"] = { $in: size };

            } else return res.status(400).send({ status: false, message: "Provide The size as u have selected" })
        }

        //filtering through name key(title)
        if (name != null) {
            if (name.trim().length > 0) {
                if (!isValid(name)) return res.status(400).send({ status: false, message: "Please Enter name Value " });
                data["title"] = name;
            } else {
                return res.status(400).send({ status: false, message: "Provide The name for selection", });
            }
        }

        //filtering through price key(price)

        if (priceGreaterThan != null) {
            if (priceGreaterThan.length > 0) {
                if (!/^[0-9]*$/.test(priceGreaterThan)) return res.status(400).send({ status: false, message: "priceGreaterThan should be in numbers" });
                data["price"] = { $gt: priceGreaterThan };
            } else return res.status(400).send({ status: false, message: "Provide The priceGreaterThan as u have selected", });

        }

        if (priceLessThan != null) {
            if (priceLessThan.length > 0) {
                if (!/^[0-9]*$/.test(priceLessThan)) return res.status(400).send({ status: false, message: "priceLessThan should be in numbers", });
                if (priceLessThan <= 0) { return res.status(400).send({ status: false, message: "priceLessThan can't be zero" }); }
                data["price"] = { $lt: priceLessThan };
            } else return res.status(400).send({ status: false, message: "Provide The priceLessThan as u have selected", });
        }

        if (priceGreaterThan && priceLessThan) {
            data["price"] = { $gt: priceGreaterThan, $lt: priceLessThan };
        }

        let x = 1
        if (priceSort != null) {
            if (priceSort == "1" || priceSort == "-1") x = priceSort
            else return res.status(400).send({ status: false, message: "price should be in numbers and value will be 1 or -1" });
        }
        //finding data from DB
        const getData = await productModel.find(data).sort({ price: x });
        if (getData.length == 0) return res.status(404).send({ status: false, message: "No Data Found With These Filters" });

        return res.status(200).send({ status: true, data: getData });
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: err.message })
    }

}





//<<-----------------------------------------------Get Product  -------------------------------------------------------->>

const getProductById = async (req, res) => {
    try {
        let productId = req.params.productId
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "Product id is not in correct format" })

        const result = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!result) return res.status(404).send({ status: false, message: "No product available with this product Id" })

        return res.status(200).send({ status: true, message: "ProductList", data: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//<<-----------------------------------------------update Product  -------------------------------------------------------->>
//Ashutosh

const updateProduct = async (req, res) => {
    try {
        const updatedData = req.body
        const productId = req.params.productId
        let files = req.files;
        

        if (!validator.isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: "Invalid ProductId" })
        }

        const checkProduct = await productModel.findOne({ _id: productId, isDeleted: false })

        if (!checkProduct) {
            return res.status(404).send({ status: false, message: "product not found" })
        }

        if (!validator.isValidRequestBody(updatedData)) {
            return res.status(400).send({ status: false, message: "please provide product details to update" })
        }

        const { title, description, price, currencyId, currencyFormat, isFreeShipping, style, availableSizes, installments, productImage } = updatedData

        const updatedProductDetails = {}

        if (!validator.validString(title)) {
            return res.status(400).send({ status: false, message: `Title is required` })
        }
        if (title) {

            const checkTitle = await productModel.findOne({ title: title });

            if (checkTitle) {
                return res.status(400).send({ status: false, message: ` Title is already used` })
            }

            updatedProductDetails['title'] = title
        }

        if (!validator.validString(description)) {
            return res.status(400).send({ status: false, message: `Description is required` })
        }

        if (description) {
            updatedProductDetails['description'] = description
        }

        if (!validator.validString(price)) {
            return res.status(400).send({ status: false, message: `price is required` })
        }
        if (price) {

            if (isNaN(Number(price))) {
                return res.status(400).send({ status: false, message: `Price should be a valid number` })
            }
            if (price <= 0) {
                return res.status(400).send({ status: false, message: `Price should be a valid number` })
            }

            updatedProductDetails['price'] = price
        }

        if (!validator.validString(currencyId)) {
            return res.status(400).send({ status: false, message: `currencyId is required` })
        }

        if (currencyId) {
            if (currencyId != "INR") {
                return res.status(400).send({ status: false, message: 'currencyId should be a INR' })
            }

            updatedProductDetails['currencyId'] = currencyId;
        }

        if (!validator.validString(currencyFormat)) {
            return res.status(400).send({ status: false, message: `currency format is required` })
        }

        if (currencyFormat) {
            if (currencyFormat != "₹") {
                return res.status(400).send({ status: false, message: "Please provide currencyFormat in format ₹ only" })
            }
            updatedProductDetails['currencyFormat'] = currencySymbol('INR')
        }

        if (!validator.validString(isFreeShipping)) {
            return res.status(400).send({ status: false, message: `isFreeshiping is required` })
        }

        if (isFreeShipping) {

            if (!((isFreeShipping === "true") || (isFreeShipping === "false"))) {
                return res.status(400).send({ status: false, message: 'isFreeShipping should be a boolean value' })
            }

            updatedProductDetails['isFreeShipping'] = isFreeShipping
        }

        if (files && files.length) {

            let updatedproductImage = await aws_s3.uploadFile(files[0]);
            updatedProductDetails.productImage = updatedproductImage

        }

        if (!validator.validString(style)) {
            return res.status(400).send({ status: false, message: `style is required` })
        }

        if (style) {

            updatedProductDetails['style'] = style
        }

        if (!validator.validString(availableSizes)) {
            return res.status(400).send({ status: false, message: `size is required` })
        }

        if (availableSizes) {
            let sizes = availableSizes.split(",").map(x => x.trim())
            sizes.forEach((size) => {
                if (!["S", "XS", "M", "X", "L", "XXL", "XL"].includes(size)) {
                    return res.status(400).send({ status: false, message: `Available sizes must be among ${["S", "XS", "M", "X", "L", "XXL", "XL"]}` })
                }
                updatedProductDetails['availableSizes'] = sizes
            })
        }

        if (!validator.validString(installments)) {
            return res.status(400).send({ status: false, message: `installment is required` })
        }
        if (installments) {

            if (!Number.isInteger(Number(installments))) {
                return res.status(400).send({ status: false, message: `installments should be a valid number` })
            }

            updatedProductDetails['installments'] = installments
        }

        const updatedProduct = await productModel.findOneAndUpdate(
            { _id: productId },
            updatedProductDetails,
            { new: true })

        return res.status(200).send({ status: true, message: 'Product details updated successfully.', data: updatedProduct });

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}









//<<-----------------------------------------------Delete Product  -------------------------------------------------------->>
//Rukmani || Ashutosh
const deleteProductById = async (req, res) => {

    try {
        let productId = req.params.productId
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "Product id is not in correct format" })
        let deleteProduct = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        if (!deleteProduct) return res.status(404).send({ status: false, message: 'No data found :)' })
        return res.status(200).send({ status: true, message: "Product deleted successfull" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createProducts, getProductByFilter, getProductById, updateProduct, deleteProductById };