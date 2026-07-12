import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from "../../helpers/axiosInstance.js";
import toast from 'react-hot-toast';


const initialState = {
    key: '',
    subscriptionId: '',
    isPaymentVarified: {},
    finalMonth: {},
    monthlySalesRecord: [],
    allPayments: {}
}

export const getRazorpayId = createAsyncThunk('/razorpay/getId', async () => {
    try{
        const response = await axiosInstance.get('/payments/razorpay-key');
        return response.data;

    }catch(err){
        toast.error('Failed to laod Data');
    }
});

export const purchaseCourseBundel = createAsyncThunk('/purchaseCourse', async () => {
    try{
        const response = await axiosInstance.post('/payments/subscribe');
        return response.data;

    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

export const verifyUserPayment = createAsyncThunk('/payment_verify', async (data) => {
    try{
        const response = await axiosInstance.post('/payments/verify', {
            razorpayPaymentId: data.razorpayPaymentId,
            razorpaySignature: data.razorpaySignature,
            razorpaySubscriptionId: data.razorpaySubscriptionId
        });
        return response.data;

    }catch(err){
        toast.error(err?.response?.data?.message);
    }
});

export const getPaymentRecord = createAsyncThunk('/payments/record', async (data) => {
    try{
        const response = axiosInstance.get('/payments?count=100');

        toast.promise(response, {
            loading: 'Getting the payment records',
            success: (data) => {
                return data?.data?.message
            },
            error: 'Failed to get payment records'
        });

        return (await response).data;

    }catch(err){
        toast.error('Operation Failed');
    }
});

export const cancelSubscription = createAsyncThunk('/payments/cancel', async (data) => {
    try{
        const response = axiosInstance.post('/payments/unsubscribe');

        toast.promise(response, {
            loading: 'Unsubscribing Subscription',
            success: (data) => {
                return data?.data?.message
            },
            error: 'Failed to get payment records'
        });

        return (await response).data;

    }catch(err){
        toast.error('Operation Failed');
    }
});

const razorpaySlice = createSlice({
    name: 'razorpay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorpayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundel.fulfilled, (state, action) => {
            state.subscriptionId = action?.payload?.subscriptionId;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVarified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVarified = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments;
            state.finalMonth = action?.payload?.finalMonth;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord
        });
    }
});