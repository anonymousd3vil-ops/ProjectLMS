import { Router } from "express";
import {register, login, logout, getProfile} from '../controllers/user_controllers.js';
import isLoggedIn from "../middleware/auth_Middleware.js";
import upload from "../middleware/multerMiddleware.js";

const userRouter = Router();

userRouter.post('/register', upload.single('avatar'), register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/me', isLoggedIn, getProfile);


export default userRouter;