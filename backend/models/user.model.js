import mongoose, { mongo } from "mongoose";

const defaultImage = 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: defaultImage,
        required: false,
    }
    ,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokeExpiresAt: Date,

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;