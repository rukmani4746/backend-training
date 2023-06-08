const validateToken = require("../middleware/validateToken");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Contacts = require("../models/contactModel");

app.post('api/new-post',validateToken, async (req, res ) => {
    try {
        const { caption, desc, url } = req.body;
        const { user } = req;
        if(!caption || !desc || !url){
            res.status(400).send('Please fill all the fields')
        }
        const createPost = new Post({
            caption,
            description: desc,
            image: url,
            user: user
        })
        await createPost.save()
        res.status(200).send('Create post successfully')
    } catch (error) {
        res.status(500).send('Error' + error)
    }
})

app.get('/api/profile',validateToken, async(req,res)=>{
    try {
        const { user } = req;
        const posts = await Post.find({user: user._id}).populate("user","_id,name")
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).send(error)
        
    }
})

app.get('/api/posts',validateToken, async(req,res) =>{
    try {
        const { user } = req;
        const posts = await Post.find().populate('user','_id name email').sort({'_id':-1})
        res.status(200).json({posts,user})
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/api/friends',validateToken,async(req,res)=>{
    try {
        const { name } = req.query;
        const { user: follower } = req
        console.log(name, req.query);
        const [ user ] = await User.find({name})
        console.log(user);
        const posts = await Post.find({user: user._id});
        const [isFollowed] = await Contacts.find({follower: follower._id, followed:user._id});
        console.log(isFollowed, 'isFollowed')

        const userDetail = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        res.status(200).json({posts,userDetail,isFollowed: !!isFollowed});
    } catch (error) {
        console.log(error);
    }
})


app.post('/api/follow',validateToken, async(req,res) => {
    try {
        const { id } = req.body;
        const { user } = req;
        if(!id) return res.status(400).send('id cannot be empty');
        const [followedUser] = User.find({ _id: id});
        const followUser = new Contacts({
            follower: user,
            followed: followedUser
        })
        await followUser.save()
        res.status(200).json({ isFollowed: true });

    } catch (error) {
        console.log(error,'error');
        res.status(500).send(error)
    }
})


app.delete('/api/unfollow',validateToken, async(req,res) => {
    try {
        const { id } = req.body;
        const { user } = req;
        if(!id) return res.status(400).send('id cannot be empty')
        await Contacts.deleteOne({ follower: user._id, followed: id});
        res.status(200).json({isFollowed: false});
    } catch (error) {
        console.log(error,'error');
        res.status(500).send(error)
        
    }
})

module.exports = createPost;