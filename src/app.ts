import express from 'express';
import mongoose, {ConnectOptions} from "mongoose";
//userRoute
import UserRoute from './routes/user';

const app = express();

const connectionString = "mongodb+srv://rukmanisdb:vjycEqeXgt3fpaS7@cluster0.fw901z3.mongodb.net/QuizApp";

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello")
})

//redirect /user to Route
app.use('/user',UserRoute)
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Database Connected Successfuly.");
  })
  .catch((err) => {
    console.log("Error Connectiong to the Database");
  });

app.listen(process.env.PORT || 3000, () => console.log("server running on port 3000"));
