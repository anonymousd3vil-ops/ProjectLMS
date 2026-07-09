import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk('/course/get', async () => {
    try{
        const response = axiosInstance.get('/courses');
        toast.promise(response, {
            loading: 'Loading Course Data',
            success: 'Courses Loaded Successfully',
            error: 'Failed to load Courses'
        });

        return (await response).data.courses;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

export const createCourse = createAsyncThunk('/course/create', async (data)=> {
    try{
        const response = axiosInstance.post('/courses', data);
        // console.log(response);

        toast.promise(response, {
            loading: 'Creating Course',
            success: 'Course Created Successfully',
            error: 'Failed to Create Course'
        });

        return (await response).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builer) => {
        builer.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload){
                state.courseData = [...action.payload]
            }
        })
    }
});

export default courseSlice.reducer;