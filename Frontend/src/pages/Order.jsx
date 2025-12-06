

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const authToken = token || storedToken;
        if (!authToken) return;

        const response = await fetch(`${backendUrl}api/order/user`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const data = await response.json();

        if (data.success) {
          setOrderData(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [backendUrl, token]);

  if (!orderData.length)
    return <p className="text-center text-gray-500 mt-10">No orders found.</p>;

  return (
    <div className="border-t mt-24 px-4 sm:px-10">
      <div className="text-2xl mb-9 mt-5">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.map((order, idx) => (
        <div key={idx} className="py-6 border-t border-b flex flex-col gap-6">
          {/* Products in order */}
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 rounded-xl sm:w-20"
                  src={item.product?.image?.[0]?.url || "/placeholder.png"}
                  alt={item.product?.name || "Product"}
                />

                <div>
                  <p className="font-medium sm:text-base">
                    {item.product?.name || "Product Name"}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-700">
                    <p>
                      Price: {currency}
                      {item.product?.price || 0}
                    </p>
                    <p>
  Quantity:{" "}
  {item.sizes
    ? Object.values(item.sizes).reduce((a, b) => a + b, 0)
    : 1}
</p>
<p>
  Sizes:{" "}
  {item.sizes && Object.keys(item.sizes).length > 0
    ? Object.entries(item.sizes)
        .map(([size, qty]) => `${size}(${qty})`)
        .join(", ")
    : "-"}
</p>

                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Order info */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
              <p className="text-sm md:text-base">{order.status}</p>
            </div>

            <div className="text-gray-400 text-sm">
              Total: {currency}
              {order.amount} | Payment: {order.paymentMethod} | Date:{" "}
              {new Date(order.date).toDateString()}
            </div>

            <button className="border px-4 py-2 rounded text-sm font-medium hover:bg-gray-100">
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
