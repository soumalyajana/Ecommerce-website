import express from "express";
import upload from "../middleware/multer.js";
import { addProduct , listProducts , getProductById , deleteProduct , listProductsByCategory} from "../controllers/productController.js";

const router = express.Router();

// Handle multiple image uploads
router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.post("/remove", deleteProduct);
//router.post("/single", getAllProducts);
router.get("/list", listProducts);


export default router;
