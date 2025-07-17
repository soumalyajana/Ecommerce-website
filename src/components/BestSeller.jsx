import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title"; // ✅ Import Title component
import ProductItem from "./ProductItem"; // ✅ Ensure this exists

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5)); // ✅ Ensures at most 5 items
    }
  }, [products]); // ✅ Updated dependency array

  return (
    <div className="my-10">
      {/* Section Title */}
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="text-center mb-10 text-sm text-gray-600 sm:text-gray-500">
          Discover our best-selling products, loved by our customers!
        </p>
      </div>

      {/* Display Best Sellers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {bestSeller.length > 0 ? (
          bestSeller.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No best sellers available.</p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
