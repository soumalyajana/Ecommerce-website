import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const statusColors = {
  Placed: "bg-gray-200 text-gray-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const AdminOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Check your admin token.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId);
      const response = await axios.post(
        `${backendUrl}api/order/update-status`,
        { orderId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingOrder(null);
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-semibold mb-6">🛍️ All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-xl shadow-md bg-white hover:shadow-lg transition-all"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>User ID:</strong> {order.userId}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                  {updatingOrder === order._id && (
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="mt-3">
                <strong>Status:</strong>{" "}
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  disabled={updatingOrder === order._id}
                  className="border px-3 py-1 rounded focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Placed">Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 text-sm">
                <p>
                  <strong>Total:</strong> {currency}
                  {order.amount}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>

              {/* Products */}
              <div className="mt-4">
                <strong>Products:</strong>
                <div className="flex flex-col gap-3 mt-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-center border rounded-lg p-3 hover:bg-gray-50 transition"
                    >
                      <img
                        src={item.image?.[0]?.url || "/placeholder.png"}
                        alt={item.name || "Product"}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-700">
                          Price: {currency}
                          {item.price}
                        </p>
                        <p className="text-sm text-gray-700">
                          Quantity:{" "}
                          {item.sizes
                            ? Object.values(item.sizes).reduce(
                                (a, b) => a + b,
                                0
                              )
                            : 1}
                        </p>
                        <p className="text-sm text-gray-700">
                          Sizes:{" "}
                          {item.sizes && Object.keys(item.sizes).length > 0
                            ? Object.entries(item.sizes)
                                .map(([size, qty]) => `${size}(${qty})`)
                                .join(", ")
                            : "-"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
