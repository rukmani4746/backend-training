//redirect request to particular method on controller
import express from 'express';
import { getUser , updateUser, } from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuth'
const router = express.Router();

//Get /user/:userId
router.get('/:userId', isAuthenticated, getUser);

//update user
router.put('/', isAuthenticated, updateUser)

export default router;
