import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products?.length) {
      setLatestProducts(products.slice(0, 10)); // ✅ Ensures latest 10 products
    }
  }, [products]);

  return (
    <div className="my-10">
      {/* Section Title */}
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
      </div>

      {/* Description */}
      <p className="text-center mb-10 text-sm text-gray-600 sm:text-gray-500">
        Discover our latest collections featuring top-quality products, curated just for you!
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
        {latestProducts.length > 0 ? (
          latestProducts.map((product) => (
            <ProductItem
              key={product._id} // ✅ Unique key for better performance
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-center col-span-5 text-gray-500">
            No latest collections available.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
