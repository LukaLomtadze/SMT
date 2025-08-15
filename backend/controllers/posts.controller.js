import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
    try {
      const posts = await Post.find({})
        .populate("author", "name image")
        .sort({ createdAt: -1 });
  
      return res.status(200).json({ success: true, data: posts });
    } catch (error) {
      res.status(400).json({ success: false, message: "Server error" });
    }
  };

  export const newPost = async (req, res) => {
    const { content, images } = req.body;
  
    if (!content) {
      return res.status(400).json({ success: false, message: "Please provide content" });
    }
  
    const newPost = new Post({
      content,
      images,
      author: req.userId
    });
  
    try {
      await newPost.save();
      return res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, message: "Error creating new post" });
    }
  };
  

