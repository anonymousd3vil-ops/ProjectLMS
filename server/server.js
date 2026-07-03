import app from './app.js';
import connectToDB from './config/dbConnection.js';
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay'

const PORT = process.env.PORT || 5050;

//cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//razorpay configuration
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

app.listen(PORT, ()=> {
    connectToDB();
    console.log(`Server is stated at http://localhost:${PORT}...`);
});

