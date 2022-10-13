const express = require("express")
const router = express.Router();
const {createUserDocument, userLogin, getUser, updateUser} = require("../controller/userController")
const {authentication} = require("../middleware/auth")
const { createProducts, getProductByFilter, getProductById, updateProduct, deleteProductById } = require("../controller/productController")


//<--------------------User Api's---------------------------->
 router.post("/register", createUserDocument)
 router.post("/login", userLogin)
 router.get("/user/:userId/profile", authentication, getUser)
 router.put("/user/:userId/profile", authentication, updateUser);


//<--------------------Product Api's---------------------------->

router.post("/products", createProducts)
router.get("/products", getProductByFilter)
router.get("/products/:productId", getProductById)
 router.put("/products/:productId", updateProduct)
// router.delete("/products/:productId", deleteProductById)





module.exports = router