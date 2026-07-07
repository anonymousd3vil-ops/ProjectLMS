import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice.js";
import { useEffect } from "react";
import HomeLayout from "../../layouts/homeLayout.jsx";
import CourseCard from "../../components/courseCard.jsx";

function CourseList(){
    const dispatch = useDispatch();

    const {courseData} = useSelector((state) => state.course);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(()=> {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <div className="pt-20 min-h-[90vh] flex flex-col text-white items-center bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a]">
                <h1 className="text-3xl font-bold mb-4">
                    Explore the courses made by<span className="text-4xl font-extrabold text-yellow-500"> Industry experts </span>
                </h1>
                <div className="flex flex-wrap">
                    {courseData?.map((element) => {
                        return <CourseCard key={element._id} data={element}/>
                    })}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;