import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getUserData, updateProfile } from '../../redux/slices/authSlice.js';
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

import HomeLayout from "../../layouts/homeLayout.jsx";

function EditProfile(){
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [data, setData] = useState({
        previewImage: '',
        fullName: '',
        avatar: '',
        userId: useSelector((state) => state?.auth?.data?._id)
    });

    function handelImageUplaod(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function(){
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                });
            });
        }
    }

    function handelInputChange(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name] : value
        });
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!data.fullName || !data.avatar){
            toast.error('Please Fill All Details');
            return;
        }

        //checking length of name
        if(data.fullName.length<5){
            toast.error('Name shuld be atleast 5 characters');
            return;
        }

        const formData = new FormData();

        formData.append('fullName', data.fullName);
        formData.append('avatar', data.avatar);

        await dispatch(updateProfile([data.userId, formData]));

        await dispatch(getUserData());

        navigate('/user/profile');
    }

    return (
            <HomeLayout>
                <title>Edit Profile</title>
                <div className="pt-20 h-screen flex flex-col text-white items-center bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a]">
                    <form 
                        noValidate
                        onSubmit={onFormSubmit}
                        className="flex flex-col justify-center items-center gap-3 p-8 text-white w-96 backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.2)]"
                    >
                        <h1 className='text-center text-2xl font-semibold'>Edit Profile</h1>
                        <label htmlFor="image_uploads" className="cursor-pointer">
                            {data.previewImage ? (
                                <img  className="w-28 h-28 rounded-full border-4 border-yellow-500 object-cover transition-all duration-300 group-hover:scale-105 m-auto" src={data.previewImage}/>
                            ) : <BsPersonCircle className="w-28 h-28 text-yellow-400 transition-all duration-300 group-hover:scale-150 rounded-full m-auto"/>}
                        </label>
                        <input 
                            onChange={handelImageUplaod}
                            className='hidden'
                            type='file'
                            id='image_uploads'
                            name='image_uploads'
                            accept='.jpg, .png, .svg, .jpeg'
                        />
                        <div>
                            <div className="flex md:flex-row flex-col justify-between md:my-1  md:items-center my-3">
                                <label htmlFor="fullName" className="text-xl font-semibold">Name: </label>
                                <input 
                                    type="text" 
                                    required
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Full Name"
                                    className=" w-full bg-white/5 border-gray-700 px-4 py-3 focus:border-yellow-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all border rounded-xl md:w-7/10"
                                    onChange={handelInputChange}
                                    value={data.fullName}
                                />
                            </div>
                            <div>
                                <button 
                                    onClick={() => navigate('/user/editprofile')}
                                    className="bg-yellow-500 font-bold  hover:bg-yellow-600 btn rounded-lg btn-wide transition-all ease-in-out duration-300 w-full mt-5">
                                    Edit Profile
                                </button>
                                <Link to="/user/profile" >
                                    <p className='link text-accent cursor-pointer flex items-center justify-center w-full'>
                                       <FaArrowLeft /> Go Back to Profile
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </HomeLayout>
        );
}

export default EditProfile;