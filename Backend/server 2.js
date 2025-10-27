import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js"

dotenv.config();
connectDB();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// ✅ Error Handler (optional but recommended)
app.use(errorMiddleware);

// ✅ Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
