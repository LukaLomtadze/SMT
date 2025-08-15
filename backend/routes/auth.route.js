import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword,updateUserName ,resetPassword, checkAuth, updatePassword, getUsers, findUsers, updateImage } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { followUser, unFollowUser } from "../controllers/followers.controller.js";
import { newPost, getPosts } from "../controllers/posts.controller.js";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)

router.put("/updatepassword", verifyToken, updatePassword)
router.put("/updateUserName", verifyToken, updateUserName);
router.put("/updateImage", verifyToken, updateImage)

router.get("/user/:id", verifyToken, getUsers)
router.get("/users/:id" ,findUsers)

router.post("/follow/:id", verifyToken, followUser);
router.post("/unfollow/:id", verifyToken, unFollowUser);

router.post("/newPost", verifyToken, newPost)
router.get("/getPosts", verifyToken, getPosts)

export default router;