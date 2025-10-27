import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

// ✅ Helper: Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    // Create JWT token
    const token = createToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return res.status(200).json({ success: true, message: "Admin login successful", token });
    }

    res.status(401).json({ success: false, message: "Invalid admin credentials" });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
