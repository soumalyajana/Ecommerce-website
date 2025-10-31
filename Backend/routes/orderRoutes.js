import express from "express";
import {
  placeOrderStripe,
  placeOrderRazorpay,
  userOrders,
  allOrders,
  updateStatus,
  placeOrderCOD,
} from "../controllers/orderController.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// User Routes
router.post("/place/stripe", authMiddleware, placeOrderStripe);
router.post("/place/razorpay", authMiddleware, placeOrderRazorpay);
router.post("/cod", authMiddleware, placeOrderCOD);
router.get("/user", authMiddleware, userOrders);


// ✅ Admin Routes
router.get("/all", adminAuth, allOrders);
router.post("/update-status", adminAuth, updateStatus);

export default router;
