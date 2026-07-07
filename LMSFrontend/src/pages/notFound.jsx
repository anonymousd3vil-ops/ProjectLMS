import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-linear-to-br from-[#020716] via-[#081122] to-[#0d1b36] flex items-center justify-center px-4">
            <title>Not Found</title>
            <div className="max-w-3xl text-center">

                <h1 className="text-8xl md:text-[10rem] font-black bg-linear-to-r from-[#FFF7AE] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent select-none drop-shadow-[0_0_25px_rgba(255,215,0,0.35)]">
                    404
                </h1>

                {/* Heading */}
                <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">
                    Lost in Space?
                </h2>

                <p className="mt-5 text-base md:text-lg text-gray-400 leading-relaxed">
                    The page you're looking for doesn't exist or has been
                    moved to another galaxy. Let's get you back on track.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 m-10">

                    <button
                        onClick={() => navigate(-1)}
                        className="btn border border-yellow-500 font-bold text-xl hover:bg-yellow-500 btn-wide text-white transition-all ease-in-out duration-300"
                    >
                        <FaArrowLeft/>
                        Previous Page
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-yellow-500 font-bold text-xl hover:bg-yellow-600 btn rounded-lg btn-wide transition-all ease-in-out duration-300"
                    >
                        <FaHome />
                        Go Home
                    </button>


                </div>
            </div>
        </div>
    );
}

export default NotFound;    