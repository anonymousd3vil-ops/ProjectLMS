import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/homeLayout.jsx";
import { RiImageUploadLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { createCourse } from "../../redux/slices/courseSlice.js";


function CreateCourse(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState('');

    const [userInput, setUserInput] = useState({
        title: '',
        description: '',
        category: '',
        createdBy: '',
        thumbnail: null
    });

    function handelUserInput(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    function getImage(event){
        event.preventDefault();

        const uploadedImage = event.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader();

            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function (){
                setPreviewImage(this.result);
                setUserInput({
                    ...userInput,
                    thumbnail: uploadedImage
                });
            });
        }
    }

    async function createNewCourse(event){
        event.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.createdBy || !userInput.thumbnail || !userInput.category){
            toast.error('Please Fill All Details');
            return;
        }

        //checking length of description
        if(userInput.description.length<10){
            toast.error('Description must be minimum of 10 characters');
            return;
        }

        if(userInput.description.length>200){
            toast.error('Description must be less than 200 characters');
            return;
        }

        //checking length of title
        if(userInput.title.length<8){
            toast.error('Title must be minimum of 8 characters');
            return;
        }

        if(userInput.title.length>60){
            toast.error('Title must be less than 60 characters');
            return;
        }


        const formData = new FormData();
        formData.append('title', userInput.title);
        formData.append('description', userInput.description);
        formData.append('createdBy', userInput.createdBy);
        formData.append('category', userInput.category);
        formData.append('thumbnail', userInput.thumbnail);

        // console.log(formData);

        //dispach create account action
        const response = await dispatch(createCourse(formData));

        // console.log("In create Course:", response);

        if(response?.payload?.success){
            navigate('/courses');
        }

        setUserInput({
            title: '',
            description: '',
            category: '',
            createdBy: '',
            thumbnail: null
        });

        setPreviewImage('');
    }

    return (
        <HomeLayout>
            <title>Create Course</title>
            <div className="min-h-screen bg-linear-to-br from-[#020716] via-[#081122] to-[#0f172a] flex items-center justify-center p-4">
                <form noValidate onSubmit={createNewCourse} className="flex flex-col justify-center items-center gap-3 p-8 text-white md:w-1/2 w-9/10 backdrop-blur-xl bg-white/5 border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                    <h1 className="text-2xl text-center font-bold">Create New Course</h1>
                    <label htmlFor="thumbnail" className="cursor-pointer border-2 w-full border-yellow-500 rounded-2xl">
                        {previewImage ? (
                            <img  className="w-full rounded-2xl object-cover transition-all duration-300 group-hover:scale-105 m-auto" src={previewImage}/>
                        ) : <RiImageUploadLine className="w-full h-28 text-yellow-400 transition-all duration-300 group-hover:scale-150 rounded-full m-auto"/>}
                    </label>
                    <input 
                        type="file" 
                        className="hidden"
                        name="thumbnail"
                        id="thumbnail"
                        accept=".jpg, .jpeg, .png, .svg"
                        onChange={getImage}
                    />
                    <div className="flex flex-col gap-1 w-full px-2">
                        <div className="flex md:flex-row flex-col justify-between md:my-1  md:items-center my-3">
                            <label htmlFor="title" className="text-xl font-semibold">Title: </label>
                            <input 
                                type="text" 
                                required
                                name="title"
                                id="title"
                                placeholder="Enter Course Title"
                                className=" w-full bg-white/5 border-gray-700 px-4 py-3 focus:border-yellow-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all border rounded-xl md:w-7/10"
                                onChange={handelUserInput}
                                value={userInput.title}
                            />
                        </div>
                        <div className="flex flex-col md:my-1 my-2 w-full">
                            <label htmlFor="description" className="text-xl font-semibold">Description: </label>
                            <textarea 
                                required
                                name="description"
                                id="description"
                                placeholder="Description of the Course"
                                className="resize-none w-full h-50 bg-white/5 border-gray-700 px-4 py-3 focus:border-yellow-500 focus:outline-none focus:ring-2 text-sm focus:ring-yellow-500/30 transition-all border rounded-xl mt-2"
                                onChange={handelUserInput}
                                value={userInput.description}
                            />
                        </div>
                        <div className="flex md:flex-row flex-col justify-between md:my-1  md:items-center my-3">
                            <label htmlFor="category" className="text-xl font-semibold">Category: </label>
                            <input 
                                type="text" 
                                required
                                name="category"
                                id="category"
                                placeholder="Course Category"
                                className=" w-full bg-white/5 border-gray-700 px-4 py-3 focus:border-yellow-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all border rounded-xl md:w-7/10"
                                onChange={handelUserInput}
                                value={userInput.category}
                            />
                        </div>
                        <div className="flex md:flex-row flex-col justify-between md:my-1  md:items-center my-3">
                            <label htmlFor="createdBy" className="text-xl font-semibold">Author Name: </label>
                            <input 
                                type="text" 
                                required
                                name="createdBy"
                                id="createdBy"
                                placeholder="Author Name"
                                className=" w-full bg-white/5 border-gray-700 px-4 py-3 focus:border-yellow-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all border rounded-xl md:w-7/10"
                                onChange={handelUserInput}
                                value={userInput.createdBy}
                            />
                        </div>
                        <div className="flex md:flex-row flex-col  justify-center md:my-1 w-full md:items-center my-3">
                            <button type="submit" className="btn rounded-xl text-lg text-black font-bold p-1 w-full py-3 border bg-linear-to-r from-yellow-400 via-yellow-500 to-amber-600 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition-full duration-300">Create Course</button>
                        </div>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;