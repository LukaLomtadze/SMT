import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  images: [
    {
      type: String,
      required: false,
      alt: String
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      count: Number,
    }
  ],
  repost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  tags: [
    {
      type: String,
      trim: true
    }
  ],
  visibility: {
    type: String,
    enum: ["public", "friends", "private"],
    default: "public"
  }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
