import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    fullName: {
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
    
    forgotPasswordExpiry: Date,
    subscription: {
        id: String,
        status: String
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    generateJWToken: async function(){
        return JWT.sign(
            {id: this._id, email: this.email, subscription: this.subscription, role: this.role}, //tokenizing id and email
            process.env.JWT_SECRET_KEY,  //by secret key
            {expiresIn: process.env.JWT_EXPIRY}  //this token will expire in 24hrs
        )
    },
    comaparePassword: async function (plainTextPass) {
        return await bcrypt.compare(plainTextPass, this.password);
    },
    generatePasswordResetToken: async function( ){
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

        this.forgotPasswordExpiry = Date.now() + 15*60*1000  //15min from now

        return resetToken;
    }

}

const User = model('Userinfo', userSchema);

export default User;