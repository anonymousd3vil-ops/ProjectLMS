import { Link } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout.jsx";

function HomePage(){
    return (
        <HomeLayout>    
            <div className=" text-white flex items-center justify-center gap-10 mx-10 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold">
                        Findout Best <span className="text-yellow-500 font-bold">Online Courses</span>
                    </h1>
                    <p className="text-xl text-gray-200">
                        We have large library of courses, taught by highly skilled and qualified faculties at very affordable cost.
                    </p>
                    <div className="space-s-6">
                        <Link to={'/courses'}> 
                            <button className="bg-yellow-500 px-5 py-3 rounded-md cursor-pointer hover:bg-yellow-600 font-bold text-lg transition-all ease-in-out duration-300 md:mr-8 mb-5">
                                Explore Courses
                            </button>
                        </Link>
                        <Link to={'/contact'}> 
                            <button className="border border-yellow-500 px-5 py-3 rounded-md cursor-pointer hover:bg-yellow-600 font-bold text-lg transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <img src="../../assets/homepage.png" className="hidden md:block w-100"/>
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage;