//Libraries
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaRupeeSign  } from "react-icons/fa";

//components
import { getRazorpayId, purchaseCourseBundle, verifyUserPayment } from "../../redux/slices/razorpaySlice.js";
import HomeLayout from "../../layouts/homeLayout.jsx";

function Checkout(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscriptionId = useSelector((state) => state?.razorpay?.subscriptionId);
    const userData = useSelector((state) => state?.auth?.data);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);

    async function handelSubscription(e){
        e.preventDefault();

        if(!razorpayKey || !subscriptionId){
            toast.error("Someting went wrong");
            return;
        }

        const options = {
            key: razorpayKey,
            subscription_id: subscriptionId,
            name: 'Light Tutorials Pvt. Ltd.',
            description: 'Subscription',
            theme: {
                color: '#F37254'
            },
            prefill: {
                email: userData?.email,
                name: userData?.fullName
            },
            handler: async (response) => {
                const paymentDetails = {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySubscriptionId: response.razorpay_subscription_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const res = await dispatch(verifyUserPayment(paymentDetails));
                res?.payload?.success
                    ? navigate("/checkout/success")
                    : navigate("/checkout/fail");
            }
        }

        if(!window.Razorpay){
            toast.error("Razorpay SDK failed to load");
            return;
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load(){
        await dispatch(getRazorpayId());
        await dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        load();
    }, [dispatch]);
    return (
        <HomeLayout>
            <div className="h-screen min-h-screen bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a] flex items-center justify-center p-4">
                <form 
                    onSubmit={handelSubscription}
                    className="flex flex-col justify-center items-center p-4 gap-3 text-white w-1/3 backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.2)]"
                >
                    <h1 className="w-full text-center underline text-2xl font-bold">Subscribe Bundel</h1>
                    <p>
                        This purchase will allow you to acces all the available course our platform for 
                        {" "} <span className="text-yellow-500 font-semibold">1 Year Duration. </span> {" "} All the existing and new launched courses will be also  available 
                    </p>
                    <p className="w-full flex flex-row gap-3 items-center justify-center text-4xl font-bold text-yellow-500"> <FaRupeeSign  /> 4999/- </p>
                    <p>100% refund on cancellation.</p>
                    <button
                        type="submit"
                        className="bg-yellow-500 font-bold text-xl hover:bg-yellow-600 btn rounded-lg btn-wide transition-all ease-in-out duration-300"
                    >
                        Buy Now
                    </button>
                    <Link to={'/termsandconditions'} className="link m-0 p-0 text-yellow-600 text-sm">
                        Terms and Condition applied
                    </Link>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Checkout;