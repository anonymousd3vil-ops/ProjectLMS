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

export default isLoggedIn;