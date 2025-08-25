import mongoose from "mongoose";
import Post from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name image isAdmin hasBadge")
      .sort({ createdAt: -1 });

    const userId = req.userId; // you’re setting this in middleware, right?

    const formattedPosts = posts.map(post => {
      const isLiked = post.likes.some(likeId => likeId.toString() === userId);
      const isBookmarked = post.bookMarks.some(bmId => bmId.toString() === userId);

      return {
        ...post.toObject(),
        liked: isLiked,
        bookmarked: isBookmarked,
      };
    });

    return res.status(200).json({ success: true, data: formattedPosts });
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
  }catch(error){
    console.error(error.message);
    res.status(500).json({success:false, message: "Server Error"});
  }
}
  
export const getAuthorPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.find({ author: id })
      .populate("author", "image name isAdmin hasBadge")
      .sort({ createdAt: -1 });

    const userId = req.userId;

    const formattedPosts = posts.map(post => {
      const isLiked = post.likes.some(likeId => likeId.toString() === userId);
      const isBookmarked = post.bookMarks.some(bmId => bmId.toString() === userId);

      return {
        ...post.toObject(),
        liked: isLiked,
        bookmarked: isBookmarked,
      };
    });

    return res.status(200).json({ success: true, data: formattedPosts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const toggleLike = async(req, res) => {
  try{
    const {id} = req.params
    const userId = req.userId

    const post = await Post.findById(id)
    if(!post){
      res.status(404).json({success: false, message: "Post Not Found"})
    }

    const hasLiked = post.likes.includes(userId)
    if(hasLiked){
      post.likes.pull(userId)
    }
    else{
      post.likes.push(userId)
    }

    post.likesCount = post.likes.length

    await post.save()

    res.status(200).json({ success: true, data: { likesCount: post.likesCount, liked: !hasLiked } });

  }catch(error){
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


export const toggleBookMark = async(req, res) => {
  try{
    const {id} = req.params
    const userId = req.userId

    const post = await Post.findById(id)
    if(!post){
      res.status(404).json({success: false, message: "Post Not Found"})
    }

    const hasMarked = post.bookMarks.includes(userId)
    if(hasMarked){
      post.bookMarks.pull(userId)
    }
    else{
      post.bookMarks.push(userId)
    }

    post.bookmarkCount = post.bookMarks.length

    await post.save()

    res.status(200).json({ success: true, data: { bookmarkCount: post.bookmarkCount, bookmarked: !hasMarked } });

  }catch(error){
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}