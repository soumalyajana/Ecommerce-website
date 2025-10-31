import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

// // ✅ Initialize Stripe & Razorpay
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// });

/**
 * ✅ Place Order with Stripe
 */
export const placeOrderStripe = async (req, res) => {
  // try {
  //   const { userId, items, amount, address } = req.body;

  //   // Create Stripe payment intent
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: Math.round(amount * 100), // Stripe accepts amount in cents
  //     currency: "usd",
  //     metadata: { userId },
  //   });

  //   // Create order (pending payment confirmation)
  //   const newOrder = new orderModel({
  //     userId,
  //     items,
  //     amount,
  //     address,
  //     paymentMethod: "Stripe",
  //     payment: false,
  //     date: Date.now(),
  //   });
  //   await newOrder.save();

  //   res.status(200).json({
  //     success: true,
  //     clientSecret: paymentIntent.client_secret,
  //     message: "Stripe payment initiated",
  //   });
  // } catch (error) {
  //   console.error("Stripe order error:", error);
  //   res.status(500).json({ success: false, message: "Stripe order failed" });
  // }
};

/**
 * ✅ Place Order with Razorpay
 */
export const placeOrderRazorpay = async (req, res) => {
  // try {
  //   const { userId, items, amount, address } = req.body;

  //   // Create Razorpay order
  //   const options = {
  //     amount: amount * 100, // amount in paise
  //     currency: "INR",
  //     receipt: `receipt_${Date.now()}`,
  //   };

  //   const razorpayOrder = await razorpay.orders.create(options);

  //   // Create order in database (pending payment)
  //   const newOrder = new orderModel({
  //     userId,
  //     items,
  //     amount,
  //     address,
  //     paymentMethod: "Razorpay",
  //     payment: false,
  //     date: Date.now(),
  //   });
  //   await newOrder.save();

  //   res.status(200).json({
  //     success: true,
  //     orderId: razorpayOrder.id,
  //     currency: razorpayOrder.currency,
  //     amount: razorpayOrder.amount,
  //   });
  // } catch (error) {
  //   console.error("Razorpay order error:", error);
  //   res.status(500).json({ success: false, message: "Razorpay order failed" });
  // }
};

/**
 * ✅ Place Order using Cash on Delivery (COD)
 */



export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id; // ✅ Fix here
    const { items, amount, address } = req.body;

    if (!userId || !items?.length || !amount || !address || Object.keys(address).length === 0) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Placed",
      date: Date.now(),
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully using Cash on Delivery.",
      order: newOrder,
    });
  } catch (error) {
    console.error("COD order error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





// export const placeOrderCOD = async (req, res) => {
//   try {
//     const userId = req.user?.id || req.body.userId; // ✅ Fallback if userId comes from token middleware or body
//     const { items, amount, address } = req.body;

//     // ✅ Validation
//     if (!userId || !items?.length || !amount || !address || Object.keys(address).length === 0) {
//       console.log("❌ Missing field in order:", { userId, items, amount, address });
//       return res.status(400).json({ success: false, message: "Missing required fields." });
//     }

//     // ✅ Create new order
//     const newOrder = new orderModel({
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "COD",
//       payment: false,
//       status: "Placed",
//       date: Date.now(),
//     });

//     await newOrder.save();

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully using Cash on Delivery.",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error("COD order error:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };



/**
 * ✅ Get User Orders (Frontend)
 */
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};


/**
 * ✅ Get All Orders (Admin Panel)
 */
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

/**
 * ✅ Update Order Status (Admin Panel)
 */
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.status(200).json({ success: true, message: "Order status updated!" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
};
