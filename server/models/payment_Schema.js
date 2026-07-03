import {Schema, model} from 'mongoose';

const paymentSchema = new Schema({
    razorpayPaymentId: {
        type: String,
        required: [true, 'Payment ID is Required.']
    },
    razorpaySubscriptionId: {
        type: String,
        required: [true, 'Subscription ID is Required.']
    },
    razorpaySignature: {
        type: String,
        required: [true, 'Signature ID is Required.']
    }

},{timestamps: true});

const Payment = model('Payment', paymentSchema);

export default Payment;