const express = require("express");
const { searchFriend } = require("../controller/userController")

//router object
const router = express.Router();

router.post('/search-friend',searchFriend);

module.exports = router;