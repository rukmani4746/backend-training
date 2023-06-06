const chatMessageSchema = new mongoose.Schema({
    senderId: mongoose.Schema.Types.ObjectId,
    receiverId: mongoose.Schema.Types.ObjectId,
    message: String,
  });
  
  const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
  
