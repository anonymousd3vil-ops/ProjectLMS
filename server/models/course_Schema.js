import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Course title is required.'],
        minLength: [8, 'Title must be minimum of 8 characters.'],
        maxLenght: [60, 'Maximum 60 characters are allowed'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Course description is required.'],
        minLength: [10, 'Description must be minimum of 10 characters.'],
        maxLenght: [200, 'Maximum 200 characters are allowed'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Course Category is required.'],
    },
    thumbnail:{
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    lectures: [
        {
            title: String,
            description: String,
            lecture:{
                public_id: {
                    type: String,
                    required: true
                },
                secure_url: {
                    type:String,
                    required: true
                }
            }
        }
    ],
    numberOfLectures: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Course = model('Course', courseSchema);

export default Course;