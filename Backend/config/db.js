import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error("❌ MONGO_URI not found in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      // ✅ Helps Mongoose retry longer before throwing "ENOTFOUND"
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      retryWrites: true,
    });

    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);

    // Specific DNS / network issues
    if (error.message.includes("ENOTFOUND")) {
      console.error(
        "💡 Tip: Check your internet or DNS (try 8.8.8.8 / 1.1.1.1 or flush DNS cache)."
      );
    }

    // Try reconnecting automatically after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
