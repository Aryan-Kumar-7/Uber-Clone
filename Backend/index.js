import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import userRouter from './routes/user.route.js';
import captionRouter from './routes/caption.route.js';
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/caption', captionRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});