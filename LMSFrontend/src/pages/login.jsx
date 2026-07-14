//components
import HomeLayout from "../layouts/homeLayout.jsx";
import { login } from "../redux/slices/authSlice.js";

//Libraries
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Login(){
    const dispach = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    function handelUserInput(e){
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    async function onLogin(event){
        event.preventDefault();

        if(!loginData.email || !loginData.password){
            toast.error('Please Fill All Details');
            return;
        }

        //dispach create account action
        const response = await dispach(login(loginData));

        if(response?.payload?.success){
            navigate(-1);
        }

        setLoginData({
            email: '',
            password: '',
        });

    }

    return (
        <HomeLayout>
            <title>Login</title>
            <div className="h-screen min-h-screen bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a] flex items-center justify-center p-4">
                <form noValidate onSubmit={onLogin} className="flex flex-col justify-center items-center gap-3 p-8 text-white w-96 backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                    <h1 className="text-2xl text-center font-bold">Login</h1>
                    <div className="flex flex-col gap-1 w-full px-2">
                        
                        <div className="flex md:flex-row flex-col justify-between md:my-1  md:items-center my-3">
                            <label htmlFor="email" className="text-xl font-semibold">Email: </label>
                            <input 
                                type="email" 
                                required
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                className=" w-full bg-white/5 border-gray-700 px-4 py-3 focus:border-yellow-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all border rounded-xl md:w-7/10"
                                onChange={handelUserInput}
                                value={loginData.email}
                            />
                        </div>
                        <div className="flex md:flex-row flex-col justify-between md:my-1  md:items-center my-3">
                            <label htmlFor="password" className="text-xl font-semibold">Password: </label>
                            <input 
                                type="password" 
                                required
                                name="password"
                                id="password"
                                placeholder="Password"
                                className=" w-full bg-white/5 border-gray-700 px-4 py-3 focus:border-yellow-500 focus:outline-none focus:ring-2 text-sm focus:ring-yellow-500/30 transition-all border rounded-xl md:w-7/10"
                                onChange={handelUserInput}
                                value={loginData.password}
                            />
                        </div>
                        <div className="flex md:flex-row flex-col  justify-center md:my-1 w-full md:items-center my-3">
                            <button type="submit" className="btn rounded-xl text-lg text-black font-bold p-1 w-full py-3 border bg-linear-to-r from-yellow-400 via-yellow-500 to-amber-600 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition-full duration-300">Login</button>
                        </div>
                        <p className="text-center text-gray-400 mt-4">
                            Don't have an account?
                            <Link
                                to="/signup"
                                className="text-yellow-400 ml-2 hover:text-yellow-300"
                            >
                                SignUp
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </HomeLayout>
    );
}

export default Login;