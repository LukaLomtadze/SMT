import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import crypto from "crypto";



export const followUser = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUserId = req.userId;

        if (id === currentUserId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const userToFollow = await User.findById(id);
        const currentUser = await User.findById(currentUserId);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userToFollow.followers.includes(currentUserId)) {
            return res.status(400).json({ message: "Following" });
        }

        userToFollow.followers.push(currentUserId);
        currentUser.following.push(id);

        await userToFollow.save();
        await currentUser.save();

        res.json({ message: "Followed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const unFollowUser = async (req, res) => {
    try {
        const { id } = req.params; // the user to unfollow
        const currentUserId = req.userId; // from verifyToken middleware

        if (id === currentUserId) {
            return res.status(400).json({ message: "You cannot unfollow yourself" });
        }

        const userToUnfollow = await User.findById(id);
        const currentUser = await User.findById(currentUserId);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!userToUnfollow.followers.includes(currentUserId)) {
            return res.status(400).json({ message: "Not Following" });
        }

        userToUnfollow.followers.pull(currentUserId);
        currentUser.following.pull(id);

        await userToUnfollow.save();
        await currentUser.save();

        res.json({ message: "Unfollowed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

