import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: 'String',
        required: [true, 'Full Name is Required.'],
        maxLenght: [30, 'Name must be less that 25 characters'],
        minLength: [5, 'Name must be greater that 5 characters'],
        trim: true
    },
    email: {
        type: 'String',
        required: [true, 'Email is Required.'],
        lowercase: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please Enter a valid email address.']
    },
    password: {
        type: 'String',
        required: [true, 'Password is Required.'],
        minLength: [5, 'Password shuld be greater than 5 characters.'],
        select: false
    },
    avatar: {
        public_id: {
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: 'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },

    forgotPasswordToken: String,
    
    forgotPasswordExpiry: Date
}, {
    timestamps: true
});

const User = model('Userinfo', userSchema);

export default User;