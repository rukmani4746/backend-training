const express = require("express");
const validateToken = require("../middleware/validateToken");

//router object
const router = express.Router();

const {
  createPost,
  getUserProfile,
  getFriendProfile,
  searchFriends,
  createFollower,
  unfollowUser,
  likeProfile,
  unlikeProfile,
} = require("../controller/postController");

router.post("/new-post",validateToken, createPost);
router.get("/getProfile/:postId", validateToken, getUserProfile);
router.get("/getList", validateToken, getFriendProfile);
router.get("/searchFriends", validateToken, searchFriends);
router.post("/follow", validateToken, createFollower);
router.delete("/unfollow", validateToken, unfollowUser);
router.put("/like-profile", validateToken, likeProfile);
router.put("/unlike-profile", validateToken, unlikeProfile);

module.exports = router;
