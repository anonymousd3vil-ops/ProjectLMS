import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeLayout from "../../layouts/homeLayout.jsx";
import { useSelector } from "react-redux";

function CourseDescription(){

    const {state} = useLocation();
    const {role, data} = useSelector((state) => state.auth);

    return (
        <HomeLayout>
            <title>{state?.title}</title>
            <div className=" bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a] min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
                <div className="grid md:grid-cols-2 gap-10 py-10 relative">
                    <div className="space-y-5">
                        <img 
                            className="w-full h-64 rounded-2xl"
                            src={state?.thumbnail?.secure_url} 
                            alt="Course Thumbnail" 
                        />
                        <div className="space-y-4 flex justify-between">
                            <div className="flex flex-col  justify-center text-xl">
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                            Total Lectures : {" "}
                                    </span>
                                    {state?.numberOfLectures}
                                </p>
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                            Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>
                            </div>
                            {   role === 'ADMIN' || data?.subscription?.status === 'ACTIVE'? (
                                <button className="btn">
                                    Watch Lectures
                                </button>
                            ) : (
                                <button className="btn">
                                    Subscribe
                                </button>
                            )

                            }
                        </div>
                    </div>
                    <div className="space-y-2 text-xl">
                        <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                            {state?.title}
                        </h1>
                        <p className="text-yellow-500">
                            Course Description: 
                        </p>
                        <p>{state?.description}</p>
                    </div>
                </div>
            </div>

        </HomeLayout>
    );
}

export default CourseDescription;