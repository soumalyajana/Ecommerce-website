import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    // Remove "Bearer " if present
    const jwtToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    // Verify token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded; // You can access user data later using req.user

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authMiddleware;
