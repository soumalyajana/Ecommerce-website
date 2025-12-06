import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Global variable to cache the connection in serverless environment
let isConnected = false;

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error("❌ MONGO_URI not found in environment variables.");
    // In serverless, we might not want to exit process immediately, but throw error
    throw new Error("MONGO_URI not found");
  }

  // Check if we have a connection to the database or if it's currently connecting or disconnecting
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  // Check the mongoose connection state directly
  if (mongoose.connections.length > 0) {
    const connectionState = mongoose.connections[0].readyState;
    if (connectionState === 1) {
      console.log("✅ MongoDB already connected (Mongoose state)");
      isConnected = true;
      return;
    }
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Reduced timeout for serverless
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    // Do not recursively call connectDB or process.exit in serverless
    throw error;
  }
};

export default connectDB;
