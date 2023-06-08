const validateToken = require("../middleware/validateToken");
const Post = require("../models/postModel");


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

module.exports = createPost;