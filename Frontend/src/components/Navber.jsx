import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShopContext } from "../context/ShopContext";
import { useContext, useState, useEffect, useRef } from "react";
import {
  faHome,
  faAddressCard,
  faBook,
  faSearch,
  faUser,
  faBagShopping,
  faBars,
  faAngleLeft
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import collection_pic from "../assets/collection_pic.png";

const Navbar = () => {
  const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    toast.success("Logged out successfully!");
    setShowProfileMenu(false);
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white flex items-center justify-between py-5 font-medium px-4 sm:px-8 lg:px-16">

      {/* Logo */}
      <NavLink to='/'>
        <h1 className="text-2xl font-bold">Garibo</h1>
      </NavLink>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* Search */}
        <FontAwesomeIcon
          icon={faSearch}
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />

        {/* Profile */}
        <div className="group relative">
          <FontAwesomeIcon
            icon={faUser}
            className="w-5 cursor-pointer"
            onClick={() => token ? null : navigate('/login')}
          />
          {token &&
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate('/order')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={handleLogout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          }
        </div>

        {/* Cart */}
        <NavLink to="/cart" className="relative">
          <FontAwesomeIcon icon={faBagShopping} className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount}
          </p>
        </NavLink>

        {/* Mobile Menu Icon */}
        <FontAwesomeIcon
          icon={faBars}
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'} z-50`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <FontAwesomeIcon icon={faAngleLeft} className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/contact'>CONTACT</NavLink>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
