import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expenses.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.37.32:3000",
  "http://192.168.1.105:3000",
  "http://192.168.111.109:3000",
];



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Example: In your auth routes, when setting cookies, do something like this:
// res.cookie('token', token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production', // set secure in prod only
//   sameSite: 'lax', // adjust based on your needs
// });

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    // Listen on all network interfaces so other devices on LAN can connect
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
