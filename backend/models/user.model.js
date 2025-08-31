import mongoose, { mongo } from "mongoose";

const defaultImage = 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    hasBadge: {
        type: Boolean,
        default: false,
        required: false,
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