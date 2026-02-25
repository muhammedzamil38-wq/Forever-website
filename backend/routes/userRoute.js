import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  generateOtp,
  verifyOtp,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/generate-otp", generateOtp);
userRouter.post("/verify-otp", verifyOtp);

export default userRouter;
