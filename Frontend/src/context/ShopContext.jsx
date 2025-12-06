import { createContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch all products
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}api/product/list`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products!");
    }
  };

  // ✅ Fetch user cart from backend (if logged in)
  const getUserCart = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${backendUrl}api/cart/get`, {
        headers: { token },
      });
      if (response.data.success) {
        const cartData = {};

        // Convert backend format to frontend cart object
        response.data.cart.forEach((product) => {
          if (product.sizes) {
            cartData[product._id] = product.sizes;
          }
        });

        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load your cart!");
    }
  };

  // ✅ Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.warn("Please select a size!");

    let cartData = { ...cartItems };

    // Update UI instantly
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    // Sync with backend if logged in
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Added to cart!");
        } else {
          toast.error(response.data.message || "Failed to add item!");
        }
      } catch (err) {
        console.error("Error adding to cart:", err);
        toast.error("Something went wrong while adding to cart!");
      }
    } else {
      toast.info("Login to save your cart items!");
      navigate("/login");
    }
  };

  // ✅ Update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Error updating cart:", err);
      }
    }
  };

  // ✅ Calculate total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);
      if (!itemInfo) continue;

      for (const size in cartItems[item]) {
        totalAmount += itemInfo.price * cartItems[item][size];
      }
    }
    return totalAmount;
  };

  // ✅ Memoized total count
  const getCartCount = useMemo(() => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        totalCount += cartItems[items][item];
      }
    }
    return totalCount;
  }, [cartItems]);

  // ✅ Fetch products and cart on load
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // ✅ When token changes, sync cart
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUserCart();
    } else {
      localStorage.removeItem("token");
      setCartItems({});
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
