import mongoose from "mongoose";
const postSchema =new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true,
        default: 'https://th.bing.com/th/id/OIP.6WZmPAOGgy-OVq5Bm5Y06wHaEx?w=285&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    },
    category:{
        type: String,
        default: 'Uncategorized'
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
},{timestamps: true}
);

const Post = mongoose.model('Post',postSchema);

export default Post;