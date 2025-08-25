import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword,updateUserName ,resetPassword, checkAuth, updatePassword, getUsers, findUsers, updateImage, getAllTheUsers, deleteUser, makeUserAdmin, makeUserBadged } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { followUser, getPeopleWithRelations, unFollowUser } from "../controllers/followers.controller.js";
import { newPost, getPosts, deletePost, getAuthorPosts, toggleLike, toggleBookMark } from "../controllers/posts.controller.js";
import { getComments, newComment } from "../controllers/comments.controller.js";
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

router.get("/getAuthorPosts/:id", verifyToken, getAuthorPosts)

router.delete("/deletePost/:id", verifyToken, deletePost)
router.delete("/deleteUser/:id", verifyToken, deleteUser)
router.get("/getAllUsers", verifyToken, getAllTheUsers)

router.put("/makeUserAdmin/:id", verifyToken, makeUserAdmin)
router.put("/makeUserBadged/:id", verifyToken, makeUserBadged)

router.get("/getUsersWithRelations/:id", verifyToken, getPeopleWithRelations)

router.get("/getComments/:id", getComments)
router.post("/newComment/:id", verifyToken, newComment)

router.patch("/likePost/:id", verifyToken, toggleLike)
router.patch("/bookmarkPost/:id", verifyToken, toggleBookMark)

export default router;