const validateToken = require("../middleware/validateToken");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Contacts = require("../models/contactModel");

//clear
const createPost = async (req, res) => {
  try {
    const { captions, desc, url, user } = req.body;
    
    if (!captions || !desc || !url || !user) {
      res.status(400).send("Please fill all the fields");
    }
    const createPost = new Post({
      captions,
      description: desc,
      image: url,
      user: user,
    });
    await createPost.save();
    res.status(200).json({createPost});
  } catch (error) {
    // res.status(500).send("Error",{message:error.message});
    console.log(error);
    res.status(500).send(error);

  }
};

const getUserProfile = async (req, res) => {
  try {
    
    const postId = req.params.postId;
    const posts = await Post.findOne({ _id: postId })
    // .populate(
    //   "user",
    //   "_id","name",
    // );
    console.log(posts);
    res.status(200).json({ posts });

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getFriendProfile = async (req, res) => {
  try {
    const { user } = req.body;
    const posts = await Post.find()
      .populate("user", "_id name email")
      .sort({ _id: -1 });
    res.status(200).json({ posts, user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchFriends = async (req, res) => {
  try {
    const { name } = req.query;
    const { user: follower } = req;
    console.log(name, req.query);
    const [user] = await User.find({ name });
    console.log(user);
    const posts = await Post.find({ user: user._id });
    const [isFollowed] = await Contacts.find({
      follower: follower._id,
      followed: user._id,
    });
    console.log(isFollowed, "isFollowed");

    const userDetail = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    res.status(200).json({ posts, userDetail, isFollowed: !!isFollowed });
  } catch (error) {
    console.log(error);
  }
};

const createFollower = async (req, res) => {
  try {
    const { id } = req.body;
    const { user } = req;
    if (!id) return res.status(400).send("id cannot be empty");
    const [followedUser] = User.find({ _id: id });
    const followUser = new Contacts({
      follower: user,
      followed: followedUser,
    });
    await followUser.save();
    res.status(200).json({ isFollowed: true });
  } catch (error) {
    console.log(error, "error");
    res.status(500).send(error);
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { id } = req.body;
    const { user } = req;
    if (!id) return res.status(400).send("id cannot be empty");
    await Contacts.deleteOne({ follower: user._id, followed: id });
    res.status(200).json({ isFollowed: false });
  } catch (error) {
    console.log(error, "error");
    res.status(500).send(error);
  }
};

const likeProfile = async (req, res) => {
  try {
    const { id } = req.body;
    const { user } = req;
    if (!id) return res.status(400).send("id cannot be empty");

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      {
        $push: { likes: user._id },
      },
      { returnDocument: "after" }
    ).populate("user", "_id name email");

    console.log(updatedPost);

    //await followUser.save()
    res.status(200).json({ updatedPost });
  } catch (error) {
    console.log(error, "error");
    res.status(500).send(error);
  }
};

const unlikeProfile = async (req, res) => {
  try {
    const { id } = req.body;
    const { user } = req;
    if (!id) return res.status(400).send("id cannot be empty");

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      {
        $pull: { likes: user._id },
      },
      { returnDocument: "after" }
    ).populate("user", "_id name email");
    //await follower.save()
    res.status(200).json({ updatedPost });
  } catch (error) {
    console.log(error, "error");
    res.status(500).send(error);
  }
};

module.exports = {
  createPost,
  getUserProfile,
  getFriendProfile,
  searchFriends,
  createFollower,
  unfollowUser,
  likeProfile,
  unlikeProfile,
}
