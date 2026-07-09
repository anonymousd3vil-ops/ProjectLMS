import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice.js";
import { useEffect } from "react";
import HomeLayout from "../../layouts/homeLayout.jsx";
import CourseCard from "../../components/courseCard.jsx";
import { useNavigate } from "react-router-dom";

function CourseList(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseData} = useSelector((state) => state.course);

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(()=> {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <title>Courses</title>
            <div className="pt-10 min-h-[90vh] flex flex-col text-white items-center bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a]">
                {
                    isLoggedIn && role === 'ADMIN' && (
                        <button
                            onClick={() => navigate('/course/create')}
                            className="mb-10 bg-yellow-500 font-bold text-xl hover:bg-yellow-600 btn rounded-lg btn-wide transition-all ease-in-out duration-300"
                        >
                            Create New Course
                        </button>
                    )
                }
                <h1 className="text-3xl font-bold mx-4">
                    Explore the courses made by<span className="text-4xl font-extrabold text-yellow-500"> Industry experts </span>
                </h1>
                <div className="flex flex-wrap items-center justify-center my-10">
                    {courseData?.map((element) => {
                        return <CourseCard key={element._id} data={element}/>
                    })}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;