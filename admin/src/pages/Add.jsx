import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !images.some((img) => img)) {
      toast.warn("⚠️ Please fill all required fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subcategory", subCategory);
    formData.append("sizes", JSON.stringify(sizes || []));
    formData.append("bestseller", bestSeller);
    formData.append("date", new Date().toISOString());

    images.forEach((img, index) => {
      if (img) formData.append(`image${index + 1}`, img);
    });

    try {
      setIsSubmitting(true);

      const response = await axios.post(`${backendUrl}api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Product added successfully:", response.data);
      toast.success("✅ Product added successfully!");

      // ✅ Reset form after successful submission
      setImages([null, null, null, null]);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setBestSeller(false);
      setSizes([]);

    } catch (error) {
      console.error("❌ Error adding product:", error.response?.data || error);
      toast.error("❌ Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num, index) => (
            <label key={num} htmlFor={`image${num}`}>
              <img
                className="w-20 h-20 object-cover rounded-md border"
                src={
                  images[index]
                    ? URL.createObjectURL(images[index])
                    : assets.upload_area
                }
                alt={`Preview ${num}`}
              />
              <input
                type="file"
                id={`image${num}`}
                hidden
                onChange={(e) => handleImageChange(e, index)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-4 py-2 border rounded"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-4 py-2 border rounded"
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div>
          <p className="mb-2">Category</p>
          <select
            className="w-full px-4 py-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Woman">Woman</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            className="w-full px-4 py-2 border rounded"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Price</p>
          <input
            className="w-full px-4 py-2 border rounded"
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Available Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
              className={`px-3 py-1 cursor-pointer rounded border ${
                sizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-slate-200"
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-32 py-3 mt-4 rounded-2xl text-white ${
          isSubmitting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default Add;
