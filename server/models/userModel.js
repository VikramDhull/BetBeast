import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creditBalance: { type: Number, default: 10 },
  totalBetWon: { type: Number, default: 0 },
  totalProfit: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
});

const User = mongoose.model("User", userSchema);

export default User;
