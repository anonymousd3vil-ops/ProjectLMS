import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
    return (
        <HomeLayout>
            <div className="h-screen min-h-screen bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a] flex items-center justify-center p-4">
                <div className="flex flex-col justify-center items-center p-4 gap-3 text-white w-1/3 backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                    <h1 className="w-full text-center underline text-2xl font-bold">Payment failed</h1>

    
                   
                    <p className="text-sm font-semibold">
                        Oops ! Your payment failed
                    </p>
                    <p className="text-left">
                        Please try again later
                    </p>

                    
                    <RxCrossCircled className="text-red-500 text-5xl" />
                    

                    <button
                        type="submit"
                        className="bg-yellow-500 font-bold text-xl hover:bg-yellow-600 btn rounded-lg btn-wide transition-all ease-in-out duration-300"
                    >
                        Try Again
                    </button>
               
                </div>

            </div>
        </HomeLayout>
    )
}

export default CheckoutFailure;