//Librarie
import { configureStore } from "@reduxjs/toolkit";

//components
import authSliceReducer from './slices/authSlice.js';

const store = configureStore({
    reducer : {
        auth: authSliceReducer
    },
    devTools: true
});

export default store;