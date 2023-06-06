// Define FriendRequest Schema
const friendRequestSchema = new mongoose.Schema({
    senderId: mongoose.Schema.Types.ObjectId,
    receiverId: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  });
  
  const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);