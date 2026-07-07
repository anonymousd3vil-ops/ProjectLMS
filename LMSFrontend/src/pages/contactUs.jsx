import { useState } from "react"
import HomeLayout from "../layouts/homeLayout"
import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";

function ContactUs(){

    const [userInput, setUserInput] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    function handelUserInput(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if(!userInput.email || !userInput.fullName || !userInput.message){
            toast.error('All fields are mandatory');
            return;
        }
        
        //checking valid email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(userInput.email)) {
            toast.error("Invalid Email Id");
            return;
        }

        try{
            const response = axiosInstance.post('/contact/contactUs', userInput)

            toast.promise(response, {
                loading: 'Submitting Your Query',
                success: 'Query Submitted Succesfully',
                error: 'Failed to Submit Query'
            });

            const contactResponse = await response;
            if(contactResponse?.data?.success){
                setUserInput({
                    fullName: '',
                    email: '',
                    message: ''
                })
            }

        }catch(err){
            toast.error('Operation Failed')
        }

    }

    return (
        <HomeLayout>
            <title>Send Us Your Query</title>
            <div className="h-screen min-h-screen bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a] flex items-center justify-center p-4">
                <form noValidate onSubmit={onFormSubmit} className="flex flex-col justify-center items-center gap-3 p-8 text-white w-96 backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                    <h1 className="text-2xl text-center font-bold">Send Us Your Query </h1>
                    <div className="flex flex-col gap-1 w-full px-2">
                        <div className="flex md:flex-row flex-col justify-between md:my-1  md:items-center my-3">
                            <label htmlFor="fullName" className="text-xl font-semibold">Name: </label>
                            <input 
                                type="text" 
                                required
                                name="fullName"
                                id="fullName"
                                placeholder="Enter Your Name"
                                className=" w-full bg-white/5 border-gray-700 px-4 py-3 focus:border-yellow-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all border rounded-xl md:w-7/10"
                                onChange={handelUserInput}
                                value={userInput.fullName}
                            />
                        </div>

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
                                value={userInput.email}
                            />
                        </div>
                        <div className="flex flex-col md:my-1 my-2 w-full">
                            <label htmlFor="message" className="text-xl font-semibold">Message: </label>
                            <textarea 
                                required
                                name="message"
                                id="message"
                                placeholder="Type Your Message"
                                className="resize-none w-full h-50 bg-white/5 border-gray-700 px-4 py-3 focus:border-yellow-500 focus:outline-none focus:ring-2 text-sm focus:ring-yellow-500/30 transition-all border rounded-xl mt-2"
                                onChange={handelUserInput}
                                value={userInput.message}
                            />
                        </div>
                        <div className="flex md:flex-row flex-col  justify-center md:my-1 w-full md:items-center my-3">
                            <button type="submit" className="btn rounded-xl text-lg text-black font-bold p-1 w-full py-3 border bg-linear-to-r from-yellow-400 via-yellow-500 to-amber-600 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition-full duration-300">Send</button>
                        </div>
                    </div>

                </form>
            </div>
        </HomeLayout>
    )
}
export default ContactUs