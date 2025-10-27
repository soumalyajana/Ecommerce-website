import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: { type: String, required: true },
  sizes: { type: [String], required: true },
  subcategory: { type: String, required: true },
  bestSeller: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
