import mongoose from "mongoose";
import Post from "../models/post.model";

export const getPosts = async(req, res) => {
    try {
        const posts = await Post.find({})
        return res.status(200).json({success: true, data: posts})
    } catch (error) {
        console.error(error.message)
        res.status(400).json({success: false, message: "Server error"})
    }
}

export const newPost = async(req, res) => {
    const post = req.body

    if(!post.title || !post.content){
        return res.status(400).josn({success: false, message: "Please provide content and title"})
    }
    const newPostt = new Post(post)

    try {
        await newPostt.save()
        return res.status(201).json({success: false, message: "Post created"})
    } catch (error) {
        console.error(error)
        return res.status(400).json({success: false, message: "Error creating new post"})
    }
}

