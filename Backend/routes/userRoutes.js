import express from "express";
import { registerUser, loginUser, adminLogin } from "../controllers/userController.js";

const router = express.Router();

// ✅ Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin-login", adminLogin);

// (Optional) Future protected routes can go here — for example:
// router.get("/profile", authMiddleware, getUserProfile);

export default router;
