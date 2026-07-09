import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/homeLayout.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserProfile(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state?.auth?.data);
    console.log(userData);
    return (
        <HomeLayout>
            <title>Profile</title>
            <div className=" h-screen  flex flex-col text-white items-center bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a]">
                <div className="my-10 flex flex-col justify-center items-center gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_yellow]">
                    <img
                        src={userData?.avatar?.secure_url}
                        alt="user profile image"
                        className={`w-28 h-28 rounded-full
                            ${
                                userData?.role === 'ADMIN'
                                    ? 'ring-4 ring-yellow-500' 
                                    : userData?.subscription?.status === 'active'
                                    ? 'border-4 border-green-500'
                                    : userData?.subscription?.status === 'inactive'
                                    ? 'border-4 border-red-500'
                                    : ''
                            }
                        `}
                    />
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-bold text-yellow-500 tracking-wider">{userData?.fullName}</h1>
                        <p className="text-sm">{userData?.role === 'USER' ? '(LEARNER)' : '(TUTOR)'}</p>
                    </div>
                    <div className="w-full flex justify-between">
                        <p>Email: </p>
                        <p>{userData?.email}</p>
                    </div>
                    <div className="w-full flex justify-between">
                        <p>Subscription: </p>
                        <p>{userData?.subscription?.status.toUpperCase()}</p>
                    </div>
                    <div className="w-full flex justify-center gap-2">
                        <button 
                            onClick={() => navigate('/user/editprofile')}
                            className="bg-yellow-500 font-bold  hover:bg-yellow-600 btn rounded-lg btn-wide transition-all ease-in-out duration-300 w-1/2">
                            Edit Profile
                        </button>
                        
                        <button 
                            onClick={() => navigate('/user/changepassword')}
                            className="bg-yellow-500 font-bold hover:bg-yellow-600 btn rounded-lg  transition-all ease-in-out duration-300 w-1/2">
                            Change Password
                        </button>
                    </div>

                    {
                        userData?.subscription?.status === 'active' && (  
                            <div className="w-full flex justify-center gap-2">
                                <button
                                    onClick={() => navigate('/user/cancelsubscription')} 
                                    className="btn w-full bg-red-500 font-bold text-xl hover:bg-red-600 rounded-lg  transition-all ease-in-out duration-300">
                                    Cancel Subscription
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </HomeLayout>
    );
}

export default UserProfile;