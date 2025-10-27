import express from "express";
import upload from "../middleware/multer.js";
import { addProduct , listProducts , getProductById , deleteProduct } from "../controllers/productController.js";
import auth from "../middleware/adminAuth.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

// Handle multiple image uploads
router.post(
  "/add", adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.post("/remove", adminAuth, deleteProduct);
router.post("/single", getProductById);
router.post("/list", listProducts);


export default router;
