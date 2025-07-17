import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState();
  const location = useLocation();

  // Handle search action
  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", search);
  };

  useEffect(() => {
    if (location.pathname.includes("collection") && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center mt-20">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-3 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Trigger search on Enter key
            }
          }}
        />
        <button
          className="focus:outline-none"
          onClick={handleSearch} // Trigger search on click
          aria-label="Search"
        >
          <img className="w-4" src={assets.search_icon} alt="Search" />
        </button>
      </div>
      <button
        className="inline focus:outline-none"
        onClick={() => setShowSearch(false)}
        aria-label="Close search"
      >
        <img
          className="w-3 cursor-pointer"
          src={assets.cross_icon}
          alt="Close"
        />
      </button>
    </div>
  ) : null;
};

export default SearchBar;
