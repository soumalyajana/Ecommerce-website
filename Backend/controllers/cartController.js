import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// 🛒 Add Product to Cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    // Check if product already in cart for the given size
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 1;
    } else {
      cartData[itemId][size] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart successfully", cartData });

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ Update Cart Quantity
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated successfully", cartData });

  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧾 Get User Cart with Product Details
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const productIds = Object.keys(cartData);

    // Get product details for items in the cart
    const products = await productModel.find({ _id: { $in: productIds } });

    const detailedCart = products.map((product) => {
      return {
        _id: product._id,
        name: product.name,
        image: product.image[0],
        price: product.price,
        sizes: cartData[product._id] || {},
      };
    });

    res.json({ success: true, cart: detailedCart });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
