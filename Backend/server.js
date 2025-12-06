import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


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
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
    res.send("API is working");
});

// ✅ Error Handler (optional but recommended)
app.use(errorMiddleware);

// ✅ Server
// ✅ Server
const PORT = process.env.PORT || 4000;

// Only listen if the file is run directly (not imported as a module)
// In Vercel, this file is imported, so we export the app instead.
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export default app;
