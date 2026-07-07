import { Schema, model } from "mongoose";

const contactSchema = new Schema({
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
    message: {
        type: 'String',
        required: [true, 'Message is Required'],
        minLength: [5, 'Name must be greater that 5 characters'],
        trim: true
    }
}, {timestamps: true});

const Contact = model('contact', contactSchema);

export default Contact;