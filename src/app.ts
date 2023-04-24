import express from 'express';
import mongoose, {ConnectOptions} from "mongoose";
import { Request, Response, NextFunction } from "express";
//userRoute
import UserRoute from './routes/user';
import authRoute from './routes/auth';
import ProjectError from './helper/error';

const app = express();
interface ReturnResponse {
  status: "success" | "error";
  message: String;
  data: {} | [] ;
}

const connectionString = process.env.CONNECTION_STRING || "";

app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      userId: String;
    }
  }
}

app.get("/",(req,res)=>{
    res.send("hello")
})

//redirect /user to Route
app.use('/user',UserRoute)
//Redirect to auth 
app.use('/auth',authRoute)

app.use(
  (err: ProjectError, req: Request, res: Response, next: NextFunction) => {
    // email to corresponding email
    // logger for err
    let message: String;
    let statusCode: number;

    if (!!err.statusCode && err.statusCode < 500) {
      message = err.message;
      statusCode = err.statusCode;
    } else {
      message = "Something went wrong please try after sometime!";
      statusCode = 500;
    }

    let resp: ReturnResponse = { status: "error", message, data: {} };
    if (!!err.data) {
      resp.data = err.data;
    }

    console.log(err.statusCode, err.message);
    res.status(statusCode).send(resp);
  }
);
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

app.listen(process.env.PORT, () => console.log("server running on port 3000"));
