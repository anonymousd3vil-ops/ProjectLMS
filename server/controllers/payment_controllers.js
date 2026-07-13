import Payment from '../models/payment_Schema.js';
import User from '../models/user_Schema.js';
import { razorpay } from '../server.js';
import AppError from '../untils/error_utils.js';
import crypto from 'crypto';

const getRazorpayAPIKey = async (req, res, next) =>{
    res.status(200).json({
        success: true,
        message: 'Razorpay API Key',
        key: process.env.RAZORPAY_API_KEY
    });
}

const buySubscription = async (req, res, next) =>{
    try{
        const {id} = req.user;
        const user = await User.findById(id);
    
        if(!user){
            return next(new AppError('User Not Found.', 400));
        }
    
        if(user.role == 'ADMIN'){
            return next(new AppError('ADMIN pannot purchase a Subscription.', 400));
        }
    
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 1
        });
    
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;
    
        await user.save();
    
        res.status(200).json({
            success: true,
            message: 'Subscribed Succesfully',
            subscriptionId: subscription.id
        })
    }catch(err){
        return next(new AppError(`Error occured in byuing subscription: ${err.message}`, 400));
    }
}

const verifySubscription = async (req, res, next) =>{
    try{
        const {id} = req.user;
        const {razorpayPaymentId, razorpaySignature, razorpaySubscriptionId} = req.body;
        
        console.log("Payment Id: ", razorpayPaymentId, "Signature: ", razorpaySignature, "Subscription: ", razorpaySubscriptionId)

        const user = await User.findById(id);
    
        if(!user){
            return next(new AppError('User Not Found.', 400));
        }
        
        const subscriptionId = user.subscription.id;
        
        if (razorpaySubscriptionId !== subscriptionId) {
            return next(new AppError("Invalid subscription.", 400));
        }

        const generateSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(`${razorpayPaymentId}|${razorpaySubscriptionId}`)
            .digest('hex');
    
        if(generateSignature !== razorpaySignature){
            return next(new AppError('Payment not verified, Try Again!!', 400));
        }
    
        await Payment.create({
            razorpayPaymentId,
            razorpaySignature,
            razorpaySubscriptionId
        });
    
        user.subscription.status = 'active';
        await user.save();
    
        res.status(200).json({
            success: true,
            message: 'Payment Verified Successfully.'
        })
    }catch(err){
        return(next(new AppError(`Error occured in verifying subscription: ${err.message}`, 400)))
    }
}

const cancelSubscription = async (req, res, next) =>{
    try{
        const {id} = req.user;
    
        const user = await User.findById(id);
    
        if(!user){
            return next(new AppError('User Not Found.', 400));
        }
    
        if(user.role == 'ADMIN'){
            return next(new AppError('ADMIN pannot purchase a Subscription.', 400));
        }
    
        const subscriptionId = user.subscription.id;
    
        const subscription = await razorpay.subscriptions.cancel(subscriptionId);
    
        user.subscription.status = subscription.status;
    
        await user.save();

        res.status(200).json({
            success: true,
            message: "Subscription Cancelled"
        });

    }catch(err){
        return(next(new AppError(`Error occured in cancelling subscription: ${err.message}`, 400)));
    }
}

const allPayments = async (req, res, next) =>{
    try{
        const {count} = req.query;

        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10
        });

        res.status(200).json({
            success: true,
            message: 'All payment record',
            subscriptions
        });

        // console.log(subscriptions);
    }catch(err){
        return(next(new AppError(`Error occured in Fetching All subscriptions: ${err.message}`, 400)))
    }
}

export {
    getRazorpayAPIKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments
}
