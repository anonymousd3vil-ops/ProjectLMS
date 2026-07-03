import AppError from "../untils/error_utils.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new AppError("Unauthenticated, Please Login Again.", 401))
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    req.user = userDetails;

    next();
}

const authorizedRole = (...roles) => async (req, res, next) => {
    const currentUserRole = req.user.role;

    if(!roles.includes(currentUserRole)){
        return next(new AppError("You are not authorized Access this route.", 403))
    }

    next(); 
}

const authorizeSubscriber = async (req, res, next) => {
    const subscription = req.user.subscription;
    const currentRole = req.user.role;

    if(currentRole !== 'ADMIN' && subscription.status !== 'active'){
        return next(new AppError('Please subscribe to acces courses.', 403))
    }

    next();
}

export {
    isLoggedIn,
    authorizedRole,
    authorizeSubscriber
}
    