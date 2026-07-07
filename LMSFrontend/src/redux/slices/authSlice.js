
//components

//Libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {}
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

        return;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.role);
            state.isLoggedIn = true;
            state.data = JSON.stringify(action?.payload?.user);
            state.role = action?.payload?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = '';
        })
    }
});


export default authSlice.reducer;