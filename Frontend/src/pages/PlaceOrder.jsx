
import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const { navigate, cartItems, getCartAmount, token, backendUrl, products } =
    useContext(ShopContext);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Place Order
  const placeOrder = async () => {
    try {
      if (!token) {
        toast.error("Please login to place an order.");
        navigate("/login");
        return;
      }

      // ✅ Check if all fields are filled
      const emptyFields = Object.entries(formData).filter(
        ([, value]) => !value || value.trim() === ""
      );
      if (emptyFields.length > 0) {
        toast.error("Please fill all delivery information fields.");
        return;
      }

      // ✅ Construct order data
      const orderData = {
        items: Object.entries(cartItems)
          .map(([productId, sizes]) => {
            const product = products.find((p) => p._id === productId);
            if (!product) return null;

            return {
              productId,
              name: product.name,
              price: product.price,
              image: product.image[0],
              sizes,
            };
          })
          .filter(Boolean),
        amount: getCartAmount(),
        address: formData,
        paymentMethod: method,
      };

      console.log("🧾 Sending to backend:", JSON.stringify(orderData, null, 2));

      let response;

      // ✅ COD — direct order creation
      if (method === "cod") {
        response = await axios.post(`${backendUrl}api/order/cod`, orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Order placed successfully via Cash on Delivery!");
        navigate("/order");
      }

      // ✅ Stripe — create checkout session
      else if (method === "stripe") {
        response = await axios.post(
          `${backendUrl}api/order/stripe`,
          orderData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success && response.data.url) {
          // ✅ Redirect user to Stripe Checkout
          window.location.href = response.data.url;
        } else {
          toast.error("Failed to initialize Stripe checkout.");
        }
      }

      console.log("✅ Order Response:", response.data);
    } catch (error) {
      console.error("❌ Error placing order:", error);
      toast.error(
        error.response?.data?.message || "Failed to place order. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col mt-20 sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Delivery Info Form */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstname"
              type="text"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <input
              name="lastname"
              type="text"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mt-4"
          />
          <input
            name="street"
            type="text"
            placeholder="Street"
            value={formData.street}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mt-4"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <input
              name="state"
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              name="zipcode"
              type="text"
              placeholder="Zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <input
              name="country"
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <input
            name="phone"
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mt-4"
          />
        </div>
      </div>

      {/* Cart Summary & Payment */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="stripe" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={placeOrder}
              className="w-60 px-8 py-3 mt-6 text-sm rounded-md transition-colors bg-black text-white hover:bg-gray-800"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
