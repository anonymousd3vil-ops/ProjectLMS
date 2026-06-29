import express from 'express';
import  cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRouter from './routers/user_routers.js';
import errorMiddleware from './middleware/error_middleware.js';
import courseRouter from './routers/course_routers.js';
dotenv.config();


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true })); //it decodes to get query params

app.use(cookieParser());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(morgan('dev'));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);

app.use('/ping', (req, res) => {
    res.send('Ping Pong Server is Running!!');
});

app.all('/{*splat}', (req, res) => {
    res.status(404).send("OOPS!!, Error 404, Page Not Found!!");
});

app.use(errorMiddleware);

export default app;