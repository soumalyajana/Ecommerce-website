import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js"
import Stripe from "stripe";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Stripe & Razorpay
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// });

/**
 * ✅ Place Order with Stripe
 */
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user.id; // ✅ from authMiddleware

    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    console.log("📦 Received Stripe Order:", req.body);


    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        const product = await productModel.findById(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        return {
          productId: item.productId,
          sizes: item.sizes || {},
          name: product.name,
          image: product.image,
          price: product.price,
        };
      })
    );

    const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(orderAmount * 100),
  currency: "inr",
  metadata: { userId },
});

res.json({
  success: true,
  clientSecret: paymentIntent.client_secret,
});


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

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      orderId: newOrder._id,
      message: "Stripe payment initiated",
    });
  } catch (error) {
    console.error("Stripe order error:", error);
    res.status(500).json({ success: false, message: "Stripe order failed" });
  }
};

/**
 * ✅ Verify Stripe Payment
 */
export const verifyStripe = async (req, res) => {
  try {
    const { checkoutSessionId, orderId } = req.body;

    if (!checkoutSessionId || !orderId) {
      return res.status(400).json({ success: false, message: "Missing checkout session or order ID." });
    }

    // Retrieve the Checkout Session from Stripe
    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);

    // Get the Payment Intent ID from the session
    const paymentIntentId = session.payment_intent;

    if (!paymentIntentId) {
      return res.status(400).json({ success: false, message: "Payment Intent not found in session." });
    }

    // Retrieve the Payment Intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Paid" });
      return res.status(200).json({ success: true, message: "Payment verified and order updated." });
    } else {
      return res.status(400).json({ success: false, message: "Payment not completed yet." });
    }
  } catch (error) {
    console.error("Stripe verification error:", error);
    res.status(500).json({ success: false, message: "Failed to verify payment." });
  }
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
    const userId = req.user._id || req.user.id;
    const { items, amount, address } = req.body;

    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // Backend – placeOrderCOD
const itemsWithDetails = await Promise.all(
  items.map(async (item) => {
    const product = await productModel.findById(item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    return {
      productId: item.productId,
      sizes: item.sizes || {}, // store all sizes with quantities
      name: product.name,
      image: product.image,
      price: product.price
    };
  })
);

const newOrder = new orderModel({
  userId,
  items: itemsWithDetails,
  amount, // total order amount (can be sum of all sizes * price)
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








export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const itemsWithDetails = await Promise.all(
          order.items.map(async (item) => {
            const product = await productModel.findById(item.productId);
            return {
              ...item._doc,
              product, // full product info
              sizes: item.sizes, // keep sizes as is
            };
          })
        );

        return {
          ...order._doc,
          items: itemsWithDetails,
        };
      })
    );

    res.status(200).json({ success: true, orders: ordersWithProducts });
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
