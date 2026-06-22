import express from 'express';
import  cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use('/ping', (req, res) => {
    res.send('/pong');
});

app.all('/{*splat}', (req, res) => {
    res.status(404).send("OOPS!!, Error 404, Page Not Found!!");
});

export default app;