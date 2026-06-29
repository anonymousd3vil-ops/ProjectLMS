import AppError from "../untils/error_utils.js";
import Course from '../models/course_Schema.js';
import cloudinary from 'cloudinary';
import fs from 'fs';


const getAllCourses = async (req, res, next) => {
    try{
        const courses = await Course.find({}).select('-lectures');

        if(!courses){
            return next(new AppError('No Courses are Available', 400));
        }

        res.status(200).json({
            success: true,
            message: 'All courses fetched successfully.',
            courses
        });
    }catch(err){
        res.status(400).json({
            success: false,
            message: `Courses Fetching Failed: ${err.message}`
        });
    }
}

const getLecturesByCourseId = async (req, res, next) => {
    try{
        const { id } = req.params;
        const course = await Course.findById(id);

        if(!course){
            return next(new AppError("No Lecture is Found, Invalid Course Id", 400));
        }   

        res.status(200).json({
            success: true,
            message: 'Lectures fetched successfully.',
            lectures: course.lectures
        })

    }catch(err){
        res.status(400).json({
            success: false,
            message: `Lecture Fetching Failed: ${err.message}`
        });
    }
}

const createCourse = async (req, res, next) => {
    try{
        const { title, description, category, createdBy, thumbnail} = req.body;
    
        if(!title || !description || !category || !createdBy){
            return next( new AppError("All fields are necesssary.", 400));
        }
    
        const course = await Course.create({
            title,
            description, 
            category, 
            createdBy,
            thumbnail: {
                public_id: 'Dummy ID',
                secure_url: 'Dummy Url'
            }
        })
    
        if(!course){
            return next(new AppError("Course could not be created, Try Again", 400));
        }
    
        if(req.file) {
            try{
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                });
    
                if(result){
                    course.thumbnail.public_id = result.public_id;
                    course.thumbnail.secure_url = result.secure_url;
    
                    //remove file from server, because it is stored on the third party server
                    // fs.rm(`uploads/${req.file.filename}`);
                    await fs.promises.rm(`uploads/${req.file.filename}`);
                }
            }catch(errInThumbnailUpload){
                return next(new AppError(`There is some Error in thumbnail Uplaod: ${errInThumbnailUpload}`, 400));
            }
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Course Creation Successfull.',
            course
        });

    }catch(errInCourseCreation){
        return next(new AppError(`There is some Error in course creation: ${errInCourseCreation}`, 400));
        res.status(400).json({
            success: false,
            message: 'Course Creation Failed.'
        });
    }

}

const updateCourse =  async(req, res, next) => {

}

const removeCourse =  async (req, res, next) => {

}


export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse
}