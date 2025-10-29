import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js"; // Make sure path is correct
import { products } from "./assets/assets.js"; // This is the file where you stored products with string image paths

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Clean previous data
    await Product.insertMany(products);
    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
