import { Router } from "express";
import {register, login, logout, getProfile} from '../controllers/user_controllers.js'

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/me', getProfile);


export default userRouter;