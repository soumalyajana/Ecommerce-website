import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // 1️⃣ Extract token (either from headers or authorization)
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No auth token provided",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Optional: check if user is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied — admin only",
      });
    }

    // 4️⃣ Attach decoded data to request
    req.user = decoded;

    // 5️⃣ Proceed to next middleware/controller
    next();

  } catch (error) {
    console.error("Admin Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default adminAuth;
