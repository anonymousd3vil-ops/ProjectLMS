import { Router } from "express";
import { getAllCourses, getLecturesByCourseId, createCourse, updateCourse, removeCourse } from "../controllers/course_controllers.js";
import isLoggedIn from "../middleware/auth_Middleware.js";
import upload from "../middleware/multerMiddleware.js";


const courseRouter = Router();

courseRouter.route('/')
    .get(getAllCourses)
    .post(upload.single('thumbnail'), createCourse);
courseRouter.route('/:id')
    .get(isLoggedIn, getLecturesByCourseId)
    .put(updateCourse)
    .delete(removeCourse);

export default courseRouter;