const express = require('express');
const route = require('./routes/route');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
app.use(express.json());

mongoose.connect("mongodb+srv://rukmanisdb:vjycEqeXgt3fpaS7@cluster0.fw901z3.mongodb.net/ReactAssignment", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use(cors())

app.use('/', route)

app.listen(3001, function () {
    console.log('Express app running on port ' + 3001)
});