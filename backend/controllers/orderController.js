import OrderModel from "../models/orderModel.js";
import userModel from "../models/useModel.js";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import razorpay from "razorpay";
//global variables

const currency = "USD";
const delivery_charges = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPPAY_KEY_SECRET,
});
// Placing Order using COD method

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = OrderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Order using Stripe method

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = OrderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },

        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: delivery_charges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Order using RazorPay method

const placeOrderRazorPay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = OrderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await OrderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successfull" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//User Order Dat for frontend

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await OrderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Staus Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel order by user (only owner can cancel) and admin return accept
const cancel_return_Order = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // Check if requester is admin by verifying token payload
    let isAdmin = false;
    try {
      const { token } = req.headers;
      if (token) {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
          isAdmin = true;
        }
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }

    // If not admin, ensure requester is the owner
    if (!isAdmin) {
      if (order.userId.toString() !== userId) {
        return res.json({ success: false, message: "Not Authorized" });
      }
    }

    await OrderModel.findByIdAndDelete(orderId);
    res.json({ success: true, message: isAdmin ? "Return Accepted" : "Order Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Return Order

const returnOrder = async (req, res) => {
  try {
    const { orderId, userId, returned } = req.body;

    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (order.userId.toString() !== userId) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    await OrderModel.findByIdAndUpdate(orderId, { returned });
    res.json({ success: true, message: "return message send to admin" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { verifyRazorpay, verifyStripe, placeOrder, placeOrderRazorPay, placeOrderStripe, userOrders, updateStatus, allOrders, cancel_return_Order, returnOrder };
