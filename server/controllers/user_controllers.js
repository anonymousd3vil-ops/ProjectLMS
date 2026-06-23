import AppError from "../untils/error_utils.js";
import User from '../models/user_Schema.js';
import cloudinary from 'cloudinary';
import fs from 'fs';

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
        if(req.file){
            console.log(req.file);
            try{
                    const result = await cloudinary.v2.uploader.upload(req.file.path, {
                        folder: 'lms',
                        width: 250,
                        height: 250,
                        gravity: 'faces',
                        crop: 'fill'
                    })

                    if(result){
                        user.avatar.public_id = result.public_id;
                        user.avatar.secure_url = result.secure_url;

                        //remove file from server, because it is stored on the third party server
                        // fs.rm(`uploads/${req.file.filename}`);
                        await fs.promises.rm(`uploads/${req.file.filename}`);
                    }

            }catch(err){
                console.log("Error in Avatar Upload: ", err.message);
                return(new AppError("Profile Picture Upload Unsuccessfull..", 500));
            }
        }
    
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

const login = async (req, res, next) => {

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
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User Logged out Successfully!!'
    });
};

const getProfile = async (req, res, next) => {

    try{
        const userId = req.user.id;
    
        const user = await User.findById(userId);
    
        res.status(200).json({
            success: true,
            message: 'User Ditails',
            user
        });

    }catch(err){
        return next(new AppError("Failed to get Profile!!", 500));
    }

};


export {register, login, logout, getProfile};