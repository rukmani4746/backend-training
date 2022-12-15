const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const router = require("./routes");
const cors = require("cors")


mongoose.set("strictQuery", true);
app.use(express.json());
app.use(cors())
app.use(express.urlencoded())
mongoose
  .connect(
    "mongodb+srv://rukmanisdb:vjycEqeXgt3fpaS7@cluster0.fw901z3.mongodb.net/groupDatabase",
  )
  .then((data) =>
    console.log("Mogodb is connected with " + data.connection.host)
  )
  .catch((err) => console.log(err));
app.use("/", router);


app.listen(3001, () => {
  console.log("Express app running on port 3001");
});
