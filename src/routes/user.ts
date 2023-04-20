//redirect request to particular method on controller
import express from 'express';
import {registerUser , getUser , updateUser} from '../controllers/user'
const router = express.Router();

//POST /user/
router.post('/',registerUser);

//Get /user/:userId
router.get('/:userId',getUser);

//update user
router.put('/',updateUser)

export default router;