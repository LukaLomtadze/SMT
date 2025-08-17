import mongoose from "mongoose";
import Post from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";

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
  
    if (!content && (!images || images.length === 0)) {
      return res.status(400).json({ success: false, message: "Please provide content" });
    }
  
    try {
      const uploadedImages = [];
      if (images && images.length > 0) {
        for (let img of images) {
          const result = await cloudinary.uploader.upload(img, {
            folder: "posts",
          });
          uploadedImages.push(result.secure_url);
        }
      }
  
      const newPost = new Post({
        content,
        images: uploadedImages,
        author: req.userId,
      });

      await newPost.save();

      const populatedData = await newPost.populate("author", "name image")
  
      res.status(201).json({ success: true, data: populatedData });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: "Error creating new post" });
    }
};

export const deletePost = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success: false, message: "Post not found"})
  }

  try{
    const postToDelete = await Post.findByIdAndDelete(id)
    return res.status(200).json({success: true, data: postToDelete})
  }catch(err){
    console.error(error.message);
    res.status(500).json({success:false, message: "Server Error"});
  }
}
  

