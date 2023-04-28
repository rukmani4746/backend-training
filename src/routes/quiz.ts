import express from 'express';
import { createQuiz , getQuiz , updateQuiz , deleteQuiz , publishQuiz } from '../controllers/quiz'

import { isAuthenticated } from '../middlewares/isAuth'

const router = express.Router();

//create 
//post/quiz/
router.post('/',isAuthenticated,createQuiz);

//get
//Get/quiz/:id
router.get('/:quizId',isAuthenticated,getQuiz);


//update
//put/quiz
router.put("/",isAuthenticated,updateQuiz);


//delete
//delete quiz/:quizId
router.delete("/:quizId",isAuthenticated,deleteQuiz);


//publish
//patch
router.patch("/publish",isAuthenticated,publishQuiz);



export default router;