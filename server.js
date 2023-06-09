const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const friendRoute = require("./routes/friendRoute");

const app = express();
const server = require("http").createServer(app);
const io = socketIO(server);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL,
   
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

// Configure middleware
app.use(express.json());
app.use("/api/v1/auth", userRoute);
app.use("/api/v2", postRoute);
app.use("/api/v3", friendRoute);

// Chat
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("chat", async ({ senderId, receiverId, message }) => {
    try {
      // Save the chat message in the database
      await ChatMessage.create({ senderId, receiverId, message });

      // Send the chat message to the receiver
      socket.to(receiverId).emit("chat", { senderId, message });
    } catch (error) {
      console.error("Failed to send chat message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
