

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import {
  faHome,
  faAddressCard,
  faBook,
  faSearch,
  faUser,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import collection_pic from "../assets/collection_pic.png";

const Navbar = () => {

  
  const {setShowSearch , getCartCount} = useContext(ShopContext);

  return (
    <div className="fixed flex w-full mt-4 sm:h-[8vh] lg:h-[10vh] top-0 opacity-80 z-10">
      <div className="mx-auto ml-56 sm:w-[80%] md:w-[50%] gap-5 lg:gap-8 bg-slate-100 h-full border-[2px] border-black rounded-2xl flex justify-center items-center">
        <ul className="flex gap-8 text-gray-700">
          {/* Home */}
          <li className="relative flex justify-center items-center hover:text-black transition duration-200 group">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              <FontAwesomeIcon icon={faHome} className="text-3xl" />
            </NavLink>
            <span className="absolute bottom-[-2rem] scale-0 group-hover:scale-100 transition-transform duration-300 text-sm bg-gray-700 text-white rounded-lg px-2 py-1">
              Home
            </span>
          </li>
          {/* Order History */}
          <li className=" h-8 w-8 relative flex justify-center items-center hover:text-black transition duration-200 group">
            <NavLink
              to="/collection"
              className={({ isActive }) => (isActive ? "fill-blue-500" : "")}
            >
              <img
                src={collection_pic}
                alt="Order History"
                className=" md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain"
              />
            </NavLink>
            <span className="absolute bottom-[-2rem] scale-0 group-hover:scale-100 transition-transform duration-300 text-sm bg-gray-700 text-white rounded-lg px-2 py-1">
              Collection
            </span>
          </li>
          {/* About */}
          <li className="relative flex justify-center items-center hover:text-black transition duration-200 group">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              <FontAwesomeIcon icon={faBook} className="text-3xl" />
            </NavLink>
            <span className="absolute bottom-[-2rem] scale-0 group-hover:scale-100 transition-transform duration-300 text-sm bg-gray-700 text-white rounded-lg px-2 py-1">
              About
            </span>
          </li>
          {/* Contact */}
          <li className="relative flex justify-center items-center hover:text-black transition duration-200 group">
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              <FontAwesomeIcon icon={faAddressCard} className="text-3xl" />
            </NavLink>
            <span className="absolute bottom-[-2rem] scale-0 group-hover:scale-100 transition-transform duration-300 text-sm bg-gray-700 text-white rounded-lg px-2 py-1">
              Contact
            </span>
          </li>
          {/* Search */}
          <li className="relative flex justify-center items-center hover:text-black transition duration-200 group">
            <NavLink
              to="/collection"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              onClick={()=> setShowSearch(true)}
            >
              <FontAwesomeIcon icon={faSearch} className="text-3xl" />
            </NavLink>
            <span className="absolute bottom-[-2rem] scale-0 group-hover:scale-100 transition-transform duration-300 text-sm bg-gray-700 text-white rounded-lg px-2 py-1">
              Search
            </span>
          </li>
          {/* Profile */}
          <li className="relative flex justify-center items-center hover:text-black transition duration-200 group">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
            </NavLink>
            <span className="absolute bottom-[-2rem] scale-0 group-hover:scale-100 transition-transform duration-300 text-sm bg-gray-700 text-white rounded-lg px-2 py-1">
              Profile
            </span>
          </li>
          {/* Cart */}
          <li className="relative flex justify-center items-center hover:text-black transition duration-200 group">
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              <p className={`absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]`}>{getCartCount}</p>
              <FontAwesomeIcon icon={faBagShopping} className="text-3xl" />
            </NavLink>
            <span className="absolute bottom-[-2rem] scale-0 group-hover:scale-100 transition-transform duration-300 text-sm bg-gray-700 text-white rounded-lg px-2 py-1">
              Cart
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;





























