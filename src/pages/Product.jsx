import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const currency = "$";

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      if (Array.isArray(foundProduct.image) && foundProduct.image.length > 0) {
        setImage(foundProduct.image[0]);
      }
    }
  }, [productId, products]);

  return productData ? (
    <div>
      <div className="mt-28 flex flex-col sm:flex-row gap-10 p-10 max-w-6xl mx-auto">
        {/* Left Section - Product Images */}
        <div className="flex w-auto gap-4">
          <div className="flex flex-col gap-2">
            {Array.isArray(productData.image) &&
              productData.image.map((item, index) => (
                <img
                  
                  key={index}
                  src={item}
                  alt={`Thumbnail ${index}`}
                  className="w-20 rounded-sm h-20 object-cover border cursor-pointer hover:border-black"
                  onClick={() => setImage(item)}
                />
              ))}
          </div>
          <div className="w-96">
            <img
              className="w-96 rounded-xl h-auto"
              src={image}
              alt="Selected product"
            />
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="Dull Star" className="w-4" />
            <p className="text-gray-600">({productData.reviews || 122})</p>
          </div>
          <p className="text-3xl font-medium mt-4">
            {currency}
            {productData.price}
          </p>
          <p className="text-gray-600 mt-4">{productData.description}</p>

          {/* Size Selection */}
          <div className="mt-6">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2 mt-2">
              {Array.isArray(productData.sizes) &&
                productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 rounded-lg transition-colors ${
                      item === size
                        ? "border-black font-semibold"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              if (!size) {
                alert("Please select a size before adding to cart.");
                return;
              }
              addToCart(productData._id, size);
            }}
            className={`w-60 px-8 py-3 mt-6 text-sm rounded-md transition-colors ${
              size ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!size}
          >
            ADD TO CART
          </button>

          {/* Additional Info */}
          <div className="text-sm text-gray-500 mt-6">
            <p>✅ 100% Original product</p>
            <p>✅ Cash on delivery is available</p>
            <p>✅ Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews ({productData.reviews || 122})</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aliquid animi doloribus veritatis ea, accusantium obcaecati, aperiam quaerat rerum quasi similique voluptatibus? Sapiente incidunt animi quod omnis labore commodi est.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, reiciendis aliquid hic recusandae soluta dicta quas libero. Nam voluptates distinctio necessitatibus commodi? Atque quibusdam blanditiis minima accusantium rem illum perferendis.</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData?.category} subCategory={productData?.subCategory} />
    </div>
  ) : (
    <div className="text-center p-10 text-gray-500">Loading...</div>
  );
};

export default Product;
