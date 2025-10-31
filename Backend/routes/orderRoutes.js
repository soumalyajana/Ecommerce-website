// import express from "express";
// import {
//   placeOrderStripe,
//   placeOrderRazorpay,
//   userOrders,
//   allOrders,
//   updateStatus,
//   placeOrderCOD,
// } from "../controllers/orderController.js";
// import auth from "../middleware/auth.js";
// import adminAuth from "../middleware/adminAuth.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // User Routes
// router.post("/place/stripe", authMiddleware, placeOrderStripe);
// router.post("/place/razorpay", authMiddleware, placeOrderRazorpay);
// router.post("/cod", authMiddleware, placeOrderCOD);
// router.get("/user", authMiddleware, userOrders);


// // ✅ Admin Routes
// router.get("/all", adminAuth, allOrders);
// router.post("/update-status", adminAuth, updateStatus);

// export default router;



import express from "express";
import {
  placeOrderStripe,
  placeOrderRazorpay,
  userOrders,
  allOrders,
  updateStatus,
  placeOrderCOD,
  verifyStripe,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminAuth from "../middleware/adminAuth.js";
import Stripe from "stripe";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();


// User Routes
// POST /api/order/stripe
router.post("/stripe", authMiddleware, async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user.id;

    if (!items?.length || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // 1️⃣ Prepare items for order
    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        const product = await productModel.findById(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        return {
          productId: item.productId,
          sizes: item.sizes,
          name: product.name,
          image: product.image,
          price: product.price,
        };
      })
    );

    // 2️⃣ Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in paise
      currency: "inr",
      metadata: { userId },
    });

    // 3️⃣ Save order in MongoDB
    const newOrder = new orderModel({
      userId,
      items: itemsWithDetails,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      status: "Pending",
      date: Date.now(),
      stripePaymentId: paymentIntent.id,
    });

    await newOrder.save();

    // 4️⃣ Create Stripe Checkout session
    const line_items = items.map((item) => {
      const quantity = Object.values(item.sizes).reduce((a, b) => a + b, 0);
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: item.image ? [item.image.url] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `http://localhost:5173/verify?session_id={CHECKOUT_SESSION_ID}&orderId=${newOrder._id}`,
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Stripe error" });
  }
});



router.post("/verify-stripe", authMiddleware, verifyStripe);
router.post("/place/razorpay", authMiddleware, placeOrderRazorpay);
router.post("/cod", authMiddleware, placeOrderCOD);
router.get("/user", authMiddleware, userOrders);

// Admin Routes
router.get("/all", adminAuth, allOrders);
router.post("/update-status", adminAuth, updateStatus);

export default router;

