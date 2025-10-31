// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//   try {
//     const token = req.headers.token;
//     if (!token) {
//       return res.json({ success: false, message: "Not Authorized, Please Login Again" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.id };
//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
//   }
// };

// export default authUser;



import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized, Please Login Again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX: Support both 'id' and '_id' in case token uses either
    req.user = { id: decoded.id || decoded._id };

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
  }
};

export default authUser;
