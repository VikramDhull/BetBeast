import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../config/sendEmail.js";

const sendOTP = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.json({
        success: false,
        message: "Email is already registered",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await sendEmail(
      email,
      "Verify your email",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );
    return res.json({
      success: true,
      message: "OTP sent. Please check your email.",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "This email is already registered. Please log in instead.",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });
    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully. Please Login to continue",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// const verifyEmailOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
//       return res.json({ success: false, message: "Invalid or expired OTP" });
//     }
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();
//     res.json({ success: true, message: "Email verified successfully" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    if (!user.isVerified) {
      return res.json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    const { _id, name, creditBalance, totalBetWon, totalProfit } = user;
    if (isPasswordMatched) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
        user: { _id, name, email, creditBalance, totalBetWon, totalProfit },
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
      },
      { new: true }
    );
    const { creditBalance, totalBetWon, totalProfit } = updatedUser;
    res.json({
      success: true,
      user: { name, email, creditBalance, totalBetWon, totalProfit },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const sendPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendEmail(
      email,
      "Password reset OTP",
      `Your OTP is ${otp} It will expire in 10 minutes.`
    );
    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyOtpAndResetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ email });
    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successful. Please Login to continue",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const goToSafeSquares = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Login again" });
    }
    if (user.creditBalance < 10) {
      return res.json({
        success: false,
        message: "Low Credit Balance",
        creditBalance: user.creditBalance,
      });
    }
    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 10,
    });
    res.json({ success: true, creditBalance: user.creditBalance - 10 });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const goToTheNet = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Login again" });
    }
    if (user.creditBalance < 20) {
      return res.json({
        success: false,
        message: "Low Credit Balance",
        creditBalance: user.creditBalance,
      });
    }
    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 20,
    });
    res.json({ success: true, creditBalance: user.creditBalance - 20 });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const goToTheMatrix = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Login again" });
    }
    if (user.creditBalance < 10) {
      return res.json({
        success: false,
        message: "Low Credit Balance",
        creditBalance: user.creditBalance,
      });
    }
    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 10,
    });
    res.json({ success: true, creditBalance: user.creditBalance - 10 });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loadCreditsData = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const saveToUserDatabase = async (req, res) => {
  try {
    const { userId, noOfWinD, profit } = req.body;
    // console.log(
    //   "userId : " + userId + "  noOfWinD : " + noOfWinD + "  profit : " + profit
    // );
    if (!userId) {
      return res.json({ message: "userId is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(userId, {
      $inc: {
        totalBetWon: noOfWinD,
        totalProfit: profit,
      },
    });

    // console.log("this is called3");

    res.json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.json({ message: "Server error" });
  }
};

export {
  sendOTP,
  registerUser,
  // verifyEmailOtp,
  loginUser,
  updateProfile,
  sendPasswordResetOTP,
  verifyOtpAndResetPassword,
  goToSafeSquares,
  goToTheNet,
  goToTheMatrix,
  loadCreditsData,
  saveToUserDatabase,
};
