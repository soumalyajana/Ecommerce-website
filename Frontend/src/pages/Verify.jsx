import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Extract query params from Stripe redirect
  const searchParams = new URLSearchParams(location.search);
  const session_id = searchParams.get("session_id"); // Correct: Checkout Session ID
  const orderId = searchParams.get("orderId"); // Pass orderId in success_url

  useEffect(() => {
    const verifyPayment = async () => {
      if (!session_id || !orderId) {
        toast.error("Missing payment or order information.");
        navigate("/cart");
        return;
      }

      try {
        const token = localStorage.getItem("token"); // Assuming user auth
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}api/order/verify-stripe`,
          { checkoutSessionId: session_id, orderId }, // Send session_id
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          toast.success("Payment verified successfully!");
          navigate("/order"); // Redirect to orders page
        } else {
          toast.error(response.data.message || "Payment verification failed.");
          navigate("/cart");
        }
      } catch (error) {
        console.error("Error verifying Stripe payment:", error);
        toast.error("Something went wrong during verification.");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [session_id, orderId, navigate]);

  return (
    <div
      className="verify-page"
      style={{ padding: "2rem", textAlign: "center" }}
    >
      {loading ? <p>Verifying your payment, please wait...</p> : <p>Redirecting...</p>}
    </div>
  );
};

export default Verify;
