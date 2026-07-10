import AppError from "../untils/error_utils.js";
import User from '../models/user_Schema.js';
import cloudinary from 'cloudinary';
import fs from 'fs';
import sendEmail from '../untils/sendEmail.js';
import crypto from 'crypto';

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
                secure_url: 'https://res.cloudinary.com/notavailable'
            }
        });
    
        if(!user){
            return next(new AppError("User Registration Failed, Try Again.", 400))
        }
    
        
        //Avatar Uplad System

        if(req.file){
            // console.log(req.file);
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
        
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        res.status(200).json({
            success: true,
            message: 'User Ditails',
            user
        });

    }catch(err){
        return next(new AppError("Failed to get Profile!!", 500));
    }

};

const forgotPassword = async(req, res, next) => {
    const {email} = req.body;

    if(!email){
        return next(new AppError("Email is Required", 400));
    }

    const user = await User.findOne({email});
    if(!user){
        return next(new AppError("Email is not Registered", 400));
    }

    const resetToken = await user.generatePasswordResetToken();
    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/api/v1/user/reset/${resetToken}`;

    const subject = "Reset Password Link!!";
    const message = `Your Reset Password Link is ${resetPasswordURL}`;

    try{
        await sendEmail(email, subject, message);
        res.status(200).json({
            success: true,
            message:`Reset Password link has been sent to ${email} Successfully!!`
        })
        console.log(message);
    }catch(err){
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();
        return next(new AppError(`Email Sending Unsuccessfull: ${err.message}`));
    }
}

const resetPassword = async(req, res, next) => {
    const {resetToken} = req.params;

    const {password} = req.body;

    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: {$gt: Date.now()}
    });

    if(!user){
        return next(new AppError("Token is Expired, Please Get new Reset Email!!", 400));
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    user.save();

    res.status(200).json({
        success: true,
        message: "Password Reset Successfull!!"
    })
}

const changePassword = async (req, res, next) => {
    const {oldPassword, newPassword} = req.body;

    const {id} = req.user;

    if(!oldPassword || !newPassword){
        return next( new AppError("Old Password and New Password are Mandetaory!!", 400));
    }

    const user = await User.findById(id).select('+password');

    if(!user){
        return next( new AppError("User doesn't Exists!!", 400));
    }

    const isPasswordValid = await user.comaparePassword(oldPassword);

    if(!isPasswordValid){
        return next( new AppError("Old Password is Incorrect!!", 400));
    }

    user.password = newPassword;

    await user.save(); 

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: "Password Changed Succesfully!!"
    });
}

const updateUser = async (req, res, next) => {
    const {fullName} = req.body;

    const {id} = req.params;

    try{
        const user = await User.findById(id);
    
        if(!user){
            return next(new AppError("User Dosen't Exists!!", 400));
        }
    
        if(fullName){
            user.fullName = fullName;
        }
    
        if(req.file){
            if(user.avatar?.public_id){
                await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            }
    
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
                return(new AppError("Profile Picture Upload Unsuccessfull..", 500));
            }
        }
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User Details Updated Succesfull!!'
        })
    } catch(err){
        return(new AppError("Failed to update User Details", 500));
    }

}

export {register, 
        login, 
        logout, 
        getProfile, 
        forgotPassword, 
        resetPassword, 
        changePassword,
        updateUser
    };