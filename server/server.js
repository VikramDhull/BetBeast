import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoute.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL, // your React app origin
  credentials: true, // allow sending cookies/auth credentials
};
app.use(cors(corsOptions));

await connectDB();

app.use("/api/user", userRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
