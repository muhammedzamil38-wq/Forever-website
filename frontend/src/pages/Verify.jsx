import React from "react";
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendurl } = useContext(ShopContext);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      // Retrieve order details from localStorage
      const orderDataStr = localStorage.getItem("orderData");
      const orderData = orderDataStr ? JSON.parse(orderDataStr) : {};

      // Send order details along with success and orderId
      const verifyData = {
        success,
        orderId,
        userId: token,
        items: orderData.items || [],
        amount: orderData.amount || 0,
        address: orderData.address || {},
      };

      const response = await axios.post(
        backendurl + "/api/order/verifyStripe",
        verifyData,
        { headers: { token } },
      );
      if (response.data.success) {
        localStorage.removeItem("orderData");
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return <div></div>;
};

export default Verify;
