import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const returnButtonClick = async (orderId) => {
    try {
      if (!token) return null;
      const response = await axios.post(backendUrl + "/api/order/cancel-return", { orderId }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message || "Return Accepted");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || "Could not accept return");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="w-full flex flex-col justify-evenly items-center border-b border-b-black">
      <Title text1='ORDERS' text2='PAGE' />
      <button onClick={fetchAllOrders} className="cursor-pointer p-2 m-2 bg-pink-200 border border-black rounded-sm w-full">LOAD ORDER</button>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span> {item.size} </span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span> {item.size} </span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.LastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ". " + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              <br />
              <br />
              {order.returned ? (
                <p className="text-sm sm:text-[15px]">
                  {currency} {order.amount}
                </p>
              ) : (
                ""
              )}
            </div>
            {!order.returned ? (
              <p className="text-sm sm:text-[15px]">
                {currency} {order.amount}
              </p>
            ) : (
              ""
            )}

            {order.returned ? (
              <div className="border border-black p-2 rounded-sm">
                <p>User asking for return</p>
                <br />
                <button onClick={() => returnButtonClick(order._id)} className="w-full p-1.5 border border-black rounded-sm cursor-pointer">
                  Accept
                </button>
              </div>
            ) : (
              ""
            )}

            <select disabled={order.status === 'Delivered'} onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold cursor-pointer">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
