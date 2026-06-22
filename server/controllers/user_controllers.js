import AppError from "../untils/error_utils.js";
import User from '../models/user_Schema.js'

const cookieOptions = {
    maxAge: 7*24*60*60*1000, //7 days
    httpOnly: true,
    secure: true
}

const register = async (req, res, next) => {
    try{
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password){
            return next(new AppError('All Fields are required....', 400));
        }
    
        const userExists = await User.findOne({email});
        if(userExists){
            return next(new AppError('User Already Exists!!', 400))
        }
    
        const user = await User.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: 'https://res.cloudinary.com'
            }
        });
    
        if(!user){
            return next(new AppError("User Registration Failed, Try Again.", 400))
        }
    
        
        //Avatar Uplad System
    
        await user.save();
    
        user.password = undefined;

        const token = await user.generateJWToken();
    
        res.cookie('token', token, cookieOptions)
    
        res.status(200).json({
            success: true,
            message: "User registration Successfull!!",
            user
        });

    }catch(err){
        console.log("Error While Registration!!");
        return next(new AppError(err.message, 500));
    }

};

const login = async (req, res) => {

    try{
        const {email, password} = req.body;
    
        if(!email || !password){
            return next(new AppError("Email and Password is Required!!", 400));
        }
    
        const user = await User.findOne({email}).select('+password');
    
        if(!user || !(await user.comaparePassword(password))){
            return next(new AppError("Email or Password Doesn't Matched!!", 400));
        }
    
        const token = await user.generateJWToken();
        user.password = undefined;
    
        res.cookie('token', token, cookieOptions);
    
        res.status(200).json({
            success: true,
            message: 'User Login Successfull...',
            user

        })

    }catch(err){
        console.log("Error While Logging In!!")
        return next(new AppError(err.message, 500));
    }


};

const logout = (req, res) => {

};

const getProfile = (req, res) => {

};


export {register, login, logout, getProfile};