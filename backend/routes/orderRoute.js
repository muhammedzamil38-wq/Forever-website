import express from "express";
import { placeOrder, placeOrderRazorPay, placeOrderStripe, userOrders, updateStatus, allOrders, verifyStripe, verifyRazorpay, cancel_return_Order, returnOrder } from "../controllers/orderController.js";
import adminAuth from "../midlleware/adminAuth.js";
import authUser from "../midlleware/auth.js";

const orderRouter = express.Router();

//Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorPay);

// User Feature
orderRouter.post("/userorders", authUser, userOrders);
// Allow users to cancel their own orders
orderRouter.post("/cancel-return", authUser || adminAuth , cancel_return_Order);

// returning order

orderRouter.post("/return", authUser, returnOrder);

// Verify Order
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

export default orderRouter;
