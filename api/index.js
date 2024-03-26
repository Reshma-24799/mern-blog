import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//getting error, will fix later
mongoose.connect('mongodb+srv://reshma24799:Newjob24@mern-blog.x0vficy.mongodb.net/mern-blog?retryWrites=true&w=majority').then
(() => {
    console.log("database is connected")
}).catch((error) => {
    console.log(error);
})
const app = express();

app.listen(3000,() => {
    console.log('server is running on port 3000')
    console.log(process.env)
});
