import express from "express";
import razorpay from "razorpay";
import User from "../models/userModel.js";
import transaction from "../models/transactionModel.js";

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const razorpayPayment = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        (plan = "Basic"), (credits = 40), (amount = 3999);
        break;
      case "Advanced":
        (plan = "Advanced"), (credits = 250), (amount = 19999);
        break;
      default:
        return res.json({ success: false, message: "Plan not found" });
    }
    date = Date.now();
    const transactionData = { userId, plan, amount, credits, date };
    const newTransaction = await transaction.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
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

const razorpayVerify = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status == "paid") {
      const transactionData = await transaction.findById(orderInfo.receipt);
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment Failed" });
      }

      const userData = await User.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await User.findByIdAndUpdate(userData._id, { creditBalance });
      await transaction.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.json({ success: true, message: "Credits Added" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getPaymentHistory = async (req, res) => {
  try {
    // console.log("getPaymentHistory API called");
    // console.log("req.body:", req.body);
    const { userId } = req.body;
    // console.log(`userid:  ${userId}`);
    const history = await transaction.find({ userId: userId.toString() });
    if (history.length > 0) {
      // console.log(history);
      res.json({ success: true, paymentHistory: history });
    } else {
      res.json({ success: false, message: "null" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { razorpayPayment, razorpayVerify, getPaymentHistory };
