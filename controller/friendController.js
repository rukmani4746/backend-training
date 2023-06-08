const Friend = require("../models/friendModel")
const User = require("../models/userModel")

app.get('/friends', (req, res) => {
    const { userId } = req.query;


    const user = User.find((user) => user.id === parseInt(userId));

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }


    const friendList = User
        .filter((friend) => user.friends.includes(friend.id))
        .map((friend) => ({ id: friend.id, email: friend.email }));

    return res.status(200).json({ friendList });
});


app.post('/remove-friend', (req, res) => {
    const { userId, friendId } = req.body;


    const user = User.find((user) => user.id === parseInt(userId));

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }


    if (!user.friends.includes(friendId)) {
        return res.status(400).json({ message: 'Friend not found' });
    }


    user.friends = user.friends.filter((friend) => friend !== friendId);

    return res.status(200).json({ message: 'Friend removed successfully' });
});


app.post('/accept-friend-request', (req, res) => {
    const { userId, friendId } = req.body;


    const user = User.find((user) => user.id === parseInt(userId));

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }


    if (!user.friendRequests.includes(friendId)) {
        return res.status(400).json({ message: 'Friend request not found' });
    }


    user.friends.push(friendId);


    user.friendRequests = user.friendRequests.filter((request) => request !== friendId);

    return res.status(200).json({ message: 'Friend request accepted' });
});


app.post('/reject-friend-request', (req, res) => {
    const { userId, friendId } = req.body;

    const user = User.find((user) => user.id === parseInt(userId));

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friendRequests.includes(friendId)) {
        return res.status(400).json({ message: 'Friend request not found' });
    }


});


app.post('/send-friend-request', (req, res) => {
    const { userId, friendId } = req.body;


    const user = User.find((user) => user.id === parseInt(userId));

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }


    const friend = User.find((user) => user.id === parseInt(friendId));

    if (!friend) {
        return res.status(404).json({ message: 'Friend not found' });
    }

    if (user.friendRequests.includes(friendId)) {
        return res.status(400).json({ message: 'Friend request already sent' });
    }


    user.friendRequests.push(friendId);

    return res.status(200).json({ message: 'Friend request sent' });
});