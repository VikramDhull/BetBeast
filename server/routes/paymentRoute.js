import express from "express";
import authUser from "../middlewares/auth.js";
import {
  getPaymentHistory,
  razorpayPayment,
  razorpayVerify,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/pay-razor", authUser, razorpayPayment);
paymentRouter.post("/verify-razor", razorpayVerify);
paymentRouter.post("/get-payment-history", getPaymentHistory);

export default paymentRouter;
