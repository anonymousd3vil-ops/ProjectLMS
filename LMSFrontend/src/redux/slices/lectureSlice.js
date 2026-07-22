import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    lectures: []
}

export const addCourseLectures  = createAsyncThunk('/course/lecture/add', async (data) => {
    try{   
        const formData = new FormData();

        formData.append('lecture', data.lecture);
        formData.append('title', data.title);
        formData.append('description', data.desctiption);


        const response = axiosInstance.post(`/courses/${data.id}`, formData); 
        toast.promise(response, {
            loading: 'Adding Course Lectures.',
            success: 'Lectures Added Successfully.',
            error: 'Failed to Add the lectures.'
        });

        return (await response).data;

    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

export const getCourseLecture  = createAsyncThunk('/course/lecture/get', async (cid) => {
    try{   
        const response = axiosInstance.get(`/courses/${cid}`);
        toast.promise(response, {
            loading: 'Fetching Course Lectures.',
            success: 'Lectures Fetched Successfully.',
            error: 'Failed to load the lectures.'
        });

        return (await response).data;

    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

export const deleteCourseLectures  = createAsyncThunk('/course/lecture/delete', async (data) => {
    try{   
        const response = axiosInstance.delete(`/courses?id=${data.courseId}&lectureId=${data.lectureId}`); 
        toast.promise(response, {
            loading: 'Deleting Course Lectures.',
            success: 'Lectures Deleted Successfully.',
            error: 'Failed to Delete the lectures.'
        });

        return (await response).data;

    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCourseLecture.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.lectures; 
        })
        .addCase(addCourseLectures.fulfilled, (state, action) => {
            console.log(action)
            state.lectures = action?.payload?.course?.lectures;
        })
    }
})

export default lectureSlice.reducer;