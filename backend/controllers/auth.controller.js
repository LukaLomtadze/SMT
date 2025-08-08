import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendEmail, sendPasswordResetEmail, sendResetPasswordSuccess, sendWelcomeEmail } from "../utils/sendEmail.js"
import crypto from "crypto";

export const signup = async(req, res) => {
    
    const {email, name, password} = req.body;
    try{
        const user = await User.findOne({email})
        
        if(!email || !password || !name){
            return res.status(401).json({success:false, message:"All fields are required"})
        }

        const userAlreadyExists = await User.findOne({email})

        if(userAlreadyExists){
            return res.status(400).json({success: false, message: "User with that email address already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            verificationToken,
            verificationTokeExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 saati
        })

        generateTokenAndSetCookie(res, newUser._id)
        sendEmail(email, verificationToken, name);

        await newUser.save()

        res.status(201).json({success:true, message: "User created succesfully"})
    }
    catch(err){
        console.error("Error: ", err)
    }
}



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