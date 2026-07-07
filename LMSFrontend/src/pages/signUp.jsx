//components
import HomeLayout from "../layouts/homeLayout.jsx";
import { createAccount } from "../redux/slices/authSlice.js";

//Libraries
import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function SignUp(){
    const dispach = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState('');

    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        password: '',
        avatar: ''
    });

    function handelUserInput(e){
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    function getImage(event){
        event.preventDefault();

        const uploadedImage = event.target.files[0];

        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });

            const fileReader = new FileReader();

            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function (){
                setPreviewImage(this.result);
            })
        }
    }

    async function createNewAccount(event){
        event.preventDefault();

        if(!signupData.fullName || !signupData.email || !signupData.password || !signupData.avatar){
            toast.error('Please Fill All Details');
            return;
        }

        //checking length of name
        if(signupData.fullName.length<5){
            toast.error('Name shuld be atleast 5 characters');
            return;
        }

        //checking valid email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(signupData.email)) {
            toast.error("Invalid Email Id");
            return;
        }

        //passwrod validation
        if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
            toast.error('Password must contain Minimum 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character')
            return;
        }

        const formData = new FormData();
        formData.append('fullName', signupData.fullName);
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);
        formData.append('avatar', signupData.avatar);

        //dispach create account action
        const response = await dispach(createAccount(formData));
        console.log(response);

        if(response?.payload?.success){
            navigate('/');
        }

        setSignupData({
            fullName: '',
            email: '',
            password: '',
            avatar: ''
        });

        setPreviewImage('');
    }

    return (
        <HomeLayout>
            <title>SignUp</title>
            <div className="flex items-center justify-center h-screen">
                <form noValidate onSubmit={createNewAccount} className="flex  flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_yellow]">
                    <h1 className="text-2xl text-center font-bold">Registration Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img  className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                        ) : <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>}
                    </label>
                    <input 
                        type="file" 
                        className="hidden"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                        onChange={getImage}
                    />

                    <div className="flex flex-col gap-1 w-full px-2">
                        <div className="flex md:flex-row flex-col justify-between md:my-1  md:items-center my-3">
                            <label htmlFor="fullName" className="text-xl font-semibold">Name: </label>
                            <input 
                                type="text" 
                                required
                                name="fullName"
                                id="fullName"
                                placeholder="Full Name"
                                className="bg-transparent px-2 py-1 border rounded-xl md:w-7/10"
                                onChange={handelUserInput}
                                value={signupData.fullName}
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
                                className="bg-transparent px-2 py-1 border rounded-xl md:w-7/10"
                                onChange={handelUserInput}
                                value={signupData.email}
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
                                className="bg-transparent px-2 py-1 border rounded-xl md:w-7/10"
                                onChange={handelUserInput}
                                value={signupData.password}
                            />
                        </div>
                        <div className="flex md:flex-row flex-col  justify-center md:my-1 w-full md:items-center my-3">
                            <button type="submit" className="btn rounded-lg text-xl font-bold p-1 w-full border bg-yellow-500 hover:bg-yellow-600 transition-full ease-in-out duration-300">Register</button>
                        </div>
                    </div>

                </form>
            </div>
        </HomeLayout>
    );
}

export default SignUp;