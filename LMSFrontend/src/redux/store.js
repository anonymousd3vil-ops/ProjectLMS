//Librarie
import { configureStore } from "@reduxjs/toolkit";

//components
import authSliceReducer from './slices/authSlice.js';
import courseSliceReducer from './slices/courseSlice.js'
import razorpaySliceReducer from './slices/razorpaySlice.js'

const store = configureStore({
    reducer : {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: razorpaySliceReducer
    },
    devTools: true
});

export default store;