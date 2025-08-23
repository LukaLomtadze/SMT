import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import mongoose from "mongoose";

export const getComments = async(req, res) => {
    try{
        const {id} = req.params

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const comments = await Comment.find({ post: id })
        .populate("author", "name image hasBadge isAdmin")
        .sort({ createdAt: -1 });

        res.status(200).json({success: true, data: comments})

    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const newComment = async (req, res) => {
    try {
      const { id: postId } = req.params;
      const userId = req.userId;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const comment = await Comment.create({
        post: postId,
        author: userId,
        content: req.body.content,
      });
  
      post.comments.push(comment._id);
      post.commentsCount = (post.commentsCount || 0) + 1;
      await post.save();
  
      res.status(201).json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating comment" });
    }
  };
  