import { Router } from "express";
import { getRazorpayAPIKey, buySubscription, verifySubscription, cancelSubscription, allPayments } from "../controllers/payment_controllers.js";
import { authorizedRole, isLoggedIn } from "../middleware/auth_Middleware.js";

const paymentRouter = Router();

paymentRouter.route('/razorpay-key')
    .get(
        isLoggedIn,
        getRazorpayAPIKey
    );

paymentRouter.route('/subscribe')
    .post(
        isLoggedIn,
        buySubscription
    );

paymentRouter.route('/verify')
    .post(
        isLoggedIn,
        verifySubscription
    );

paymentRouter.route('/unsubscribe')
    .post(
        isLoggedIn,
        cancelSubscription
    );

paymentRouter.route('/')
    .get(
        isLoggedIn,
        authorizedRole('ADMIN'),
        allPayments
    );

export default paymentRouter;
