import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendEmail } from "../utils/sendEmail.js"

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
        sendEmail(email, verificationToken);

        await newUser.save()

        res.status(201).json({success:true, message: "User created succesfully"})
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

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({success:false, message: "Invalid Password"})
        }

        generateTokenAndSetCookie(res, user._id)
        

        res.status(201).json({
            success: true,
            message:"Loged in successfully",
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

export const verifyEmail = async (req, res) => {
    try{
        
    }
    catch(err){
        console.error("Error: ", err)
    }
}