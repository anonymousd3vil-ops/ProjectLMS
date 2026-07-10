
//components

//Libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

function getStoredUserData() {
    const userData = localStorage.getItem('data');

    if(!userData || userData === 'undefined'){
        return {};
    }

    try{
        return JSON.parse(userData);
    }catch{
        localStorage.removeItem('data');
        return {};
    }
}

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    role: localStorage.getItem('role') || '',
    data: getStoredUserData()
};

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
    try{
        const res = axiosInstance.post('/user/register', data);
        toast.promise(res, {
            loading: 'Wait! Creating Account',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to create account'    
        });

        return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

export const login = createAsyncThunk('/auth/login', async (data) => {
    try{
        const res = axiosInstance.post('/user/login', data);
        toast.promise(res, {
            loading: 'Wait! Authentication in Progress',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to Login'    
        });

        return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

export const logout = createAsyncThunk('/auth/logout', async () => {
    try{
        const res = axiosInstance.get('/user/logout');
        toast.promise(res, {
            loading: 'Wait! logout in Progress',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to Logout'    
        });

        return (await res).data;

    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

export const updateProfile = createAsyncThunk('/user/update/profile', async (data) => {
    console.log(data[1])
    try{
        const res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: 'Wait! Updating Profile.',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to Update Profile'    
        });

        return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

export const getUserData = createAsyncThunk('/user/details', async () => {
    try{
        const res = axiosInstance.get(`/user/me`);
        return (await res).data;

    }catch(err){
        toast.error(err.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;

            localStorage.setItem('data', JSON.stringify(action.payload.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action.payload.user.role);
            state.isLoggedIn = true;
            state.data = action.payload.user;
            state.role = action.payload.user.role;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = '';
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;

            localStorage.setItem('data', JSON.stringify(action.payload.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action.payload.user.role);
            state.isLoggedIn = true;
            state.data = action.payload.user;
            state.role = action.payload.user.role;
        });
    }
});


export default authSlice.reducer;
