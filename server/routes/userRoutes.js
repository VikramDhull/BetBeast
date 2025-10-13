import express from "express";
import {
  goToSafeSquares,
  goToTheMatrix,
  goToTheNet,
  loadCreditsData,
  loginUser,
  registerUser,
  saveToUserDatabase,
  sendOTP,
  sendPasswordResetOTP,
  updateProfile,
  // verifyEmailOtp,
  verifyOtpAndResetPassword,
} from "../controllers/userController.js";
import authUser from "../middlewares/auth.js";
import User from "../models/userModel.js";

const userRouter = express.Router();
// userRouter.post("/verify-email", verifyEmailOtp);
userRouter.post("/send-otp", sendOTP);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update-profile", authUser, updateProfile);
userRouter.post("/send-reset-otp", sendPasswordResetOTP);
userRouter.post("/verify-reset-otp", verifyOtpAndResetPassword);
userRouter.post("/goToSafeSquares", authUser, goToSafeSquares);
userRouter.post("/goToTheNet", authUser, goToTheNet);
userRouter.post("/goToTheMatrix", authUser, goToTheMatrix);
userRouter.get("/load-Credits-Data", authUser, loadCreditsData);
userRouter.post("/saveToUserDatabase", saveToUserDatabase);

userRouter.get("/get-profile", authUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    const { _id, name, email, creditBalance, totalBetWon, totalProfit } = user;
    res.json({
      success: true,
      user: { _id, name, email, creditBalance, totalBetWon, totalProfit },
    });
  } catch (error) {
    res.json({ success: false, message: err.message });
  }
});

export default userRouter;
