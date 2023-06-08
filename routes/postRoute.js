const express = require("express");

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

router.post("/new-post", createPost);
router.get("getProfile", getUserProfile);
router.get("/getList", getFriendProfile);
router.get("/searchFriends", searchFriends);
router.post("/follow", createFollower);
router.delete("/unfollow", unfollowUser);
router.put("/like-profile", likeProfile);
router.put("/unlike-profile", unlikeProfile);


module.exports = router;
