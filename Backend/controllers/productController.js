import productModel from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

// ➕ Add a new product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
      date,
    } = req.body;

    // Extract image paths from multer files
    const image1 = req.files?.image1?.[0]?.path;
    const image2 = req.files?.image2?.[0]?.path;
    const image3 = req.files?.image3?.[0]?.path;
    const image4 = req.files?.image4?.[0]?.path;

    const imageArray = [image1, image2, image3, image4].filter(Boolean);

    // Validate required fields
    if (!name || !description || !price || !category || !subcategory || imageArray.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Upload images to Cloudinary
    const imageUrl = await Promise.all(
      imageArray.map(async (item) => {
        const result = await cloudinary.uploader.upload(item, { folder: "products" });
        return { public_id: result.public_id, url: result.secure_url };
      })
    );

    // Create and save product
    const newProduct = new productModel({
      name,
      description,
      price: Number(price),
      image: imageUrl,
      category,
      subcategory,
      sizes: JSON.parse(sizes || "[]"),
      bestSeller: bestseller === "true",
      date: date ? new Date(date) : Date.now(),
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// 📦 Get all products
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// 🔍 Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✏️ Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updatedData = req.body;

    // Handle image update if new images provided
    if (req.files && Object.keys(req.files).length > 0) {
      // Delete old images from Cloudinary
      await Promise.all(
        product.image.map((img) => cloudinary.uploader.destroy(img.public_id))
      );

      const imageArray = Object.values(req.files).map((fileArr) => fileArr[0].path);
      const uploadedImages = await Promise.all(
        imageArray.map(async (path) => {
          const result = await cloudinary.uploader.upload(path, { folder: "products" });
          return { public_id: result.public_id, url: result.secure_url };
        })
      );

      updatedData.image = uploadedImages;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ❌ Delete product
export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success: true , message: "Products Removed"});
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// 📂 List products by category or subcategory
export const listProductsByCategory = async (req, res) => {
  try {
    const { category, subcategory } = req.query;

    const query = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    const products = await productModel.find(query);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error listing products by category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


