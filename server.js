const express = require("express");
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const socketIO = require('socket.io');
const userRoute = require("./routes/userRoute")
const friendRoute = require("./routes/friendRoute")

const app = express();
const server = require('http').createServer(app);
const io = socketIO(server);

// Connect to MongoDB
mongoose.connect('mongodb+srv://rukmanisdb:vjycEqeXgt3fpaS7@cluster0.fw901z3.mongodb.net/shanti-infosoft', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

    // Configure middleware
    app.use(express.json());
    app.use("/api/v1/auth", userRoute);
    app.use("/api/v2", friendRoute);


    // Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});