import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import ProjectError from "../helper/error";

interface ReturnResponse {
  status: "success" | "error";
  message: String;
  data: {} | [] ;
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  
  let resp: ReturnResponse;
  try {
    const userId = req.params.userId;

    if(req.userId!=req.params.userId){
      const err = new ProjectError("you are not authorized");
      err.statusCode = 401;
      err.data = {hi: "its error"}
      throw err;
    }
    const user = await User.findById(userId, { name: 1, email: 1 });
    if (!user) {
      const err = new ProjectError("No user exist")
      err.statusCode = 401;
     throw err;
    } else {
      resp = { status: "success", message: "User found", data: { user: user } };
      res.status(200).send(resp);
    }
  } catch (error) {
   next(error)
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  let resp: ReturnResponse;
  try {

    if(req.userId!=req.body._id){
      const err = new ProjectError("you are not authorized");
      err.statusCode = 401;
      throw err;
    }

    const userId = req.body._id;

    console.log(req.body.name);

    const user = await User.findById(userId);
    if (!user) {
      const err = new ProjectError("No user exist")
      err.statusCode = 401;
     throw err;
    }

    user.name = req.body.name;

    await user.save();
    //   console.log(user);

    resp = { status: "success", message: "User updated", data: { user: user } };
    res.send(resp);
  } catch (error) {
    next(error)
  }
};

export { getUser, updateUser, };
