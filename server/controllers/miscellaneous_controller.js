import Contact from "../models/contact_schema.js";
import AppError from "../untils/error_utils.js"

const contactUs = async (req, res, next) => {
    try{
        const {fullName, email, message} = req.body;

        if(!fullName || !email || !message){
            return next(new AppError('All Fields are required....', 400));
        }

        const queryExists = await Contact.findOne({email});
        if(queryExists){
            return next(new AppError('You Query Already Exists', 400))
        }

        const query = await Contact.create({
            fullName,
            email,
            message
        });

        if(!query){
            return next(new AppError("Unable to send your query, Try Again.", 400))
        }

        await query.save();

        res.status(200).json({
            success: true,
            message: "User registration Successfull!!",
            query
        });
        
    }catch(err){
        console.log(err.message);
        return next(new AppError('Message Not Sent, Try Again', 500))
    }
}

const userStats = async (req, res, next) => {

}

export {
    contactUs, 
    userStats
}
