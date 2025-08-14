import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendEmail, sendPasswordResetEmail, sendResetPasswordSuccess, sendWelcomeEmail } from "../utils/sendEmail.js"
import crypto from "crypto";

export const signup = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(401).json({ success: false, message: "All fields are required" });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User with that email address already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            verificationToken,
            verificationTokeExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        await newUser.save(); 

        generateTokenAndSetCookie(res, newUser._id);

        try {
            await sendEmail(email, verificationToken, name); 
        } catch (emailErr) {
            console.error("Email sending failed:", emailErr);
        }

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...newUser._doc,
                password: undefined,
            }
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try{
        const user = await User.findOne({
            verificationToken: code,
            verificationTokeExpiresAt: {$gt : Date.now()}
        })

        if(!user){
            return res.status(400).json({success:false, message: "Invalid or Expired verification code"})
        }

        user.isVerified =true
        user.verificationToken = undefined
        user.verificationTokeExpiresAt = undefined,

        await user.save();

        sendWelcomeEmail(user.email, user.name);

        res.status(200).json({success: true, message: "Email Verified Successfully"});
    }
    catch(err){
        console.error("Error: ", err)
    }
}

export const  login = async(req, res) => {
    const {email, password} = req.body
    try{

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({success:false, message: "User not found"});
        }
        if(!user.isVerified){
            return res.status(400).json({success: false, message: "Please verify you email first"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({success:false, message: "Invalid Password"})
        }

        generateTokenAndSetCookie(res, user._id)
        

        res.status(200).json({
            success: true,
            message:"Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    }
    catch(err){
        console.error("Error: ", err)
    }
}

export const logout = async(req, res) => {
    try{
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({success:true, message: "Logged out successfully"})
    }
    catch(err){
        console.error("Error: ", err)
    }
}

export const forgotPassword = async(req, res) => {
    const {email} = req.body
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success:false, message:"User not found"});
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 //1hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`, user.name)

        res.status(200).json({ success: true, message:"Reset token sent" });
    }catch(err){
        console.error("Error: ", err);
    }
}


export const resetPassword = async (req, res) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordExpiresAt : {$gt : Date.now()}
        })

        if(!user){
            return res.status(400).json({success: false, message: "Invalid or expired reset token"})
        }

        //parolis shecval aq iwyeba

        const hashedPass = await bcrypt.hash(password, 10);
        user.password = hashedPass;
        user.resetPasswordExpiresAt = undefined;
        user.resetPasswordToken = undefined;

        await user.save();

        sendResetPasswordSuccess(user.email, user.name);

        res.status(200).json({success: true, message: "Password updated"})
    }
    catch(err){
        console.error("Error: ", err)
    }
}

export const updatePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword){
            return res.status(400).json({success: false, message: "Both old and new passwords are required"})
        }

        const user = await User.findById(req.userId);
        if(!user){
            return res.status(400).json({success: false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(404).json({success:false, message: "Old password is incorect"})
        }

        const hashedPass = await bcrypt.hash(newPassword, 10);
        user.password = hashedPass;
        await user.save()

        return res.status(200).json({success: true, message: "Password updated succesfully"});
    } catch (error) {
        console.error("Error updating password:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }

}

export const updateUserName = async(req, res) => {
    try {
        const user = await User.findById(req.userId)
        const {newName} = req.body;
        if(!user){
            return res.status(400).json({success: false, message: "User not found"})
        }

        if(!newName || !newName.trim()){
            return res.status(400).json({success: false, message: "You must fill name field"})
        }
        user.name = newName;
        await user.save()

        return res.status(200).json({success: true, message: "Name changed succesfully", user})

    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getUsers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("name email profilePic followers following"); // include followers & following

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            name: user.name,
            email: user.email,
            profilePic: user.profilePic || null,
            followersCount: user.followers.length,
            followingCount: user.following.length,
            isFollowing: req.userId ? user.followers.includes(req.userId) : false
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const findUsers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("name email");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const checkAuth = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
        }

        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
