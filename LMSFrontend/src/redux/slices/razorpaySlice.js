import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from "../../helpers/axiosInstance.js";
import toast from 'react-hot-toast';


const initialState = {
    key: '',
    subscriptionId: '',
    isPaymentVerified: false,
    finalMonth: {},
    monthlySalesRecord: [],
    allPayments: []
}

export const getRazorpayId = createAsyncThunk('/razorpay/getId', async () => {
    try{
        const response = await axiosInstance.get('/payments/razorpay-key');
        return response.data;

    }catch(err){
        toast.error('Failed to laod Data');
    }
});

export const purchaseCourseBundle = createAsyncThunk(
   '/purchaseCourse',
   async(_, {rejectWithValue})=>{
      try{
         const response = await axiosInstance.post('/payments/subscribe');
         return response.data;
      }catch(err){
         return rejectWithValue(
             err?.response?.data?.message
         );
      }
   }
);

export const verifyUserPayment = createAsyncThunk("/payment/verify", 
    async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/payments/verify", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

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
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscriptionId = action?.payload?.subscriptionId;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            state.isPaymentVerified = action?.payload?.success;
            toast.success(action?.payload?.message);
        })
        .addCase(verifyUserPayment.rejected, (state, action) => {
            state.isPaymentVerified = false;
            toast.error(action.payload || "Payment verification failed");
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action.payload?.subscriptions || [];
            state.finalMonth = action?.payload?.finalMonth;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord
        });
    }
});

export default razorpaySlice.reducer