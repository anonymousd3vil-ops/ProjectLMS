import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";

function AccessDenied() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020716] flex items-center justify-center px-6">
            <title>Access Denied</title>

            {/* Background Glow */}
            {/* <div className="absolute h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl"></div> */}

            <div className=" relative max-w-2xl w-full rounded-3xl border border-yellow-500/20 bg-zinc-900/80 backdrop-blur-md shadow-[0_0_40px_rgba(250,204,21,0.12)] p-10 text-center overflow-hidden">

                {/* Decorative Circle */}
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-yellow-500/5 blur-3xl"></div>

                {/* Lock Icon */}
                <div className="flex justify-center">

                    <div className=" h-28 w-28 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.25)]">
                        <FaLock className="text-5xl text-yellow-400" />
                    </div>

                </div>

                {/* Error Code */}
                <h1 className="mt-8 text-7xl font-extrabold text-yellow-400 tracking-wider">
                    403
                </h1>

                {/* Heading */}

                <h2 className="mt-4 text-3xl font-bold text-white">
                    Access Denied
                </h2>

                {/* Description */}
                <p className="mt-5 text-zinc-400 text-lg leading-8 max-w-xl mx-auto">
                    Sorry, you don't have permission to access this page.
                    This section is restricted and requires appropriate
                    authorization.
                </p>

                {/* Divider */}
                <div className="divider divider-warning my-8">
                    Restricted Area
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-5">

                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-xl px-8"
                    >
                        <FaArrowLeft />
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className=" btn bg-yellow-400 border-none text-black hover:bg-yellow-300 rounded-xl px-8 "
                    >
                        <FaHome />
                        Home
                    </button>

                </div>

                {/* Bottom Note */}
                <p className="mt-10 text-sm text-zinc-500">
                    If you believe this is a mistake, please contact the administrator
                    or sign in with an account that has the required permissions.
                </p>

            </div>

        </div>
    );
}

export default AccessDenied;