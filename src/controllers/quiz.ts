import { Request, Response, NextFunction } from "express";
import Quiz from "../models/quiz";
import ProjectError from "../helper/error";
interface ReturnResponse {
  status: "success" | "error";
  message: String;
  data: {} | [];
}

const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created_by = req.userId;

    const name = req.body.name;
    const questions_list = req.body.questions_list;
    const answers = req.body.answers;

    const quiz = new Quiz({ name, questions_list, answers });
    const result = await quiz.save();
    const resp: ReturnResponse = {
      status: "success",
      message: "Quiz created successfully",
      data: { quizId: result._id },
    };
    res.status(201).send(resp);
  } catch (error) {
    next(error);
  }
};



const getQuiz = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId,{name:1,questions_list:1,answers:1});
  // console.log(quiz);
  
  if(!quiz){
    const err = new ProjectError("Quiz not found");
    err.statusCode = 404;
    throw err;
  }
  const resp:ReturnResponse = { status:"success" ,message:"quiz",data:quiz};
  res.status(200).send(resp)
  
  } catch (error) {
    next(error)
  }
};


const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const quizId = req.body._id;
  const quiz = await Quiz.findById(quizId);
  if(!quiz){
    const err = new ProjectError("Quiz not found");
    err.statusCode = 404;
    throw err;
  }
  quiz.name = req.body.name;
  quiz.questions_list = req.body.questions_list;
  quiz.answers = req.body.answers;
 await quiz.save();
 const resp:ReturnResponse = { status: "success",message:"quiz updated successfully",data:{}}
 res.status(200).send(resp);
 } catch (error) {
  next(error)
 }
};


const deleteQuiz = (req: Request, res: Response) => {
  res.send(req.params.quizId);
};


const publishQuiz = (req: Request, res: Response) => {
  res.send(req.body);
};


export { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz };
