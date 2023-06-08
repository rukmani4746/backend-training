const express = require("express");
const { searchFriend } = require("../controller/userController")

//router object
const router = express.Router();

router.get('/search-friend/:key',searchFriend);

module.exports = router;