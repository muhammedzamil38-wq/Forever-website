import express from "express";
import {
  placeOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  userOrders,
  updateStatus,
  allOrders,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";
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

// Verify Order
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default orderRouter;
