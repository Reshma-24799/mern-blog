import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.route.js'
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO).then
(() => {
    console.log("database is connected")
}).catch((error) => {
    console.log(error);
})
const app = express();

app.use(express.json()); //allow json as the input of backend
app.use(cookieParser());

app.listen(3000,() => {
    console.log('server is running on port 3000')
});
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use((err,req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})