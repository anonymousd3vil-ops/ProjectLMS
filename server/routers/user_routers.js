import { Router } from "express";
import {register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser} from '../controllers/user_controllers.js';
import {isLoggedIn} from "../middleware/auth_Middleware.js";
import upload from "../middleware/multerMiddleware.js";

const userRouter = Router();

userRouter.post('/register', upload.single('avatar'), register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/me', isLoggedIn, getProfile);
userRouter.post('/reset', forgotPassword);
userRouter.post('/reset/:resetToken', resetPassword);
userRouter.post('/change-password', isLoggedIn, changePassword); 
userRouter.put('/update/:id', isLoggedIn, upload.single("avatar"), updateUser);

export default userRouter;