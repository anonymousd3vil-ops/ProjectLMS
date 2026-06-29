import { Router } from "express";
import { getAllCourses, getLecturesByCourseId, createCourse, updateCourse, removeCourse, addLecturesByCourseId, removeLecturesByCourseId } from "../controllers/course_controllers.js";
import { authorizedRole, isLoggedIn } from "../middleware/auth_Middleware.js";
import upload from "../middleware/multerMiddleware.js";


const courseRouter = Router();

courseRouter.route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizedRole('ADMIN'),
        upload.single('thumbnail'), 
        createCourse
    );

courseRouter.route('/:id')
    .get(isLoggedIn, getLecturesByCourseId)
    .put(isLoggedIn, authorizedRole('ADMIN'), updateCourse)
    .delete(isLoggedIn, authorizedRole('ADMIN'), removeCourse)
    .post(isLoggedIn, authorizedRole('ADMIN'), upload.single('lecture'), addLecturesByCourseId);

courseRouter.route('/:id/:lectureId')
    .delete(isLoggedIn, authorizedRole('ADMIN'), removeLecturesByCourseId);

export default courseRouter;