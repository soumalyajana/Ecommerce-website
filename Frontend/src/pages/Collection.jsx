import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("relevant"); // Default sorting option

  // Toggle selection for categories and types
  const toggleSelection = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = products.filter((product) => {
      const name = product.name?.toLowerCase() || "";

      // 🔥 Derive category (handles "woman"/"women", "men", "kids")
      let derivedCategory = "";
      if (name.match(/\bmen\b/i)) derivedCategory = "Men";
      else if (name.match(/\bwomen\b|\bwoman\b/i)) derivedCategory = "Women";
      else if (name.match(/\bkid\b|\bboy\b|\bgirl\b/i)) derivedCategory = "Kids";

      // Derive type
      let derivedType = "";
      if (name.match(/t-?shirt|shirt|top/i)) derivedType = "Topware";
      else if (name.match(/pant|trouser|jean/i)) derivedType = "Bottomwear";
      else if (name.match(/jacket|hoodie|sweater/i)) derivedType = "Winterwear";

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((selected) =>
          derivedCategory.toLowerCase().includes(selected.toLowerCase())
        );

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.some((selected) =>
          derivedType.toLowerCase().includes(selected.toLowerCase())
        );

      const matchesSearch =
        !showSearch || !search || name.includes(search.toLowerCase());

      return matchesCategory && matchesType && matchesSearch;
    });

    if (sortOption === "price-low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [
    products,
    selectedCategories,
    selectedTypes,
    sortOption,
    search,
    showSearch,
  ]);



  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-10 mt-20">
      {/* Sidebar Filter Section */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"
            } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((category) => (
              <label key={category} className="flex gap-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) =>
                    toggleSelection(e.target.value, setSelectedCategories)
                  }
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"
            } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topware", "Bottomwear", "Winterwear"].map((type) => (
              <label key={type} className="flex gap-2">
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={(e) =>
                    toggleSelection(e.target.value, setSelectedTypes)
                  }
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTION" />
          <select
            className="border-2 border-gray-300 rounded-xl text-sm px-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="price-low-high">Sort by: Price (Low to High)</option>
            <option value="price-high-low">Sort by: Price (High to Low)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 px-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
