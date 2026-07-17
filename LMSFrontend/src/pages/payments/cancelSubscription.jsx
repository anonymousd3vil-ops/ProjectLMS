import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/homeLayout.jsx";
import { cancelSubscription } from "../../redux/slices/razorpaySlice.js";
import { getUserData } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CancelSubscription(){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function handelCancelSubscription() {
        await dispatch(cancelSubscription());
        await dispatch(getUserData());

        toast.success("Course Cancelled Succesfully!");
        navigate('/');
    }

    return (
        <HomeLayout>
            <div className="h-screen min-h-screen bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a] flex items-center justify-center p-4">
                <div className="flex flex-col justify-center items-center p-4 gap-3 text-white w-1/3 backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                    <h1 className="w-full text-center underline text-2xl font-bold">Cancel Subscription</h1>
                    <p>
                        To cancel subscription click on Button below.
                    </p>
                    <button
                        onClick={handelCancelSubscription} 
                        className="btn w-full bg-red-500 font-bold text-xl hover:bg-red-600 rounded-lg  transition-all ease-in-out duration-300">
                        Cancel Subscription
                    </button>
                    
               
                </div>

            </div>
        </HomeLayout>
    )
}

export default CancelSubscription;