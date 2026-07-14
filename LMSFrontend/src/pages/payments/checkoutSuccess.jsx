import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/slices/authSlice.js";
import { useEffect } from "react";

import HomeLayout from "../../Layouts/homeLayout.jsx";

function CheckoutSuccess(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    })

    return (
        <HomeLayout>
            <div className="h-screen min-h-screen bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a] flex items-center justify-center p-4">
                <div className="flex flex-col justify-center items-center p-4 gap-3 text-white w-1/3 backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                    <h1 className="w-full text-center underline text-2xl font-bold">Payment failed</h1>

    
                   
                    <p className="text-sm font-semibold">
                        Your payment is succesfull
                    </p>
                    <p className="text-left">
                        Now, youcan start your learning experience
                    </p>

                    
                    <AiFillCheckCircle className="text-green-500 text-5xl" />
                    
                    <Link to={'/'}>
                    
                        <button
                            type="submit"
                            className="bg-yellow-500 font-bold text-xl hover:bg-yellow-600 btn rounded-lg btn-wide transition-all ease-in-out duration-300"
                        >
                            Go to Dashboard
                        </button>
                    </Link>
               
                </div>

            </div>
        </HomeLayout>
    )
}

export default CheckoutSuccess;