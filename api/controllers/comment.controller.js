import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";


export const createComment = async (req, res, next) => {
    try {
        const {content, postId, userId } = req.body;
        if(!content || !postId || !userId ){
            next(errorHandler(400, 'All fields are required'));
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
}

export const getPostComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({
            createdAt: -1
        })
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}
export const likeComment= async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            next(errorHandler(404, 'Comment not found'));
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
}