// Define Friend Schema
const friendSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    friendId: mongoose.Schema.Types.ObjectId,
  });
  
  const Friend = mongoose.model('Friend', friendSchema);
  module.exports = Friend;