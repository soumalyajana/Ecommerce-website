import React from "react";

const Footer = () => {
  return (
    <div className="mt-14 bg-white py-10 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-gray-700 items-start">
        {/* Brand Section */}
        <div className="flex flex-col ml-12 items-center md:items-start text-center md:text-left">
          <p className="prata-regular text-2xl font-bold text-gray-500">
            Garibo
          </p>
          <div className="w-16 h-[2px] bg-gray-700 my-2"></div>
          <p className="mt-3 text-sm text-gray-600 max-w-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut tenetur
            nihil harum veniam vel inventore similique repudiandae quod, commodi
            blanditiis unde itaque laborum ullam doloribus placeat omnis iure
            ex! Cum.
          </p>
        </div>

        {/* Company Section */}
        <div className="flex ml-60 flex-col items-center md:items-start text-center md:text-left">
          <h3 className="font-semibold text-lg">COMPANY</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-black transition duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition duration-200">
                Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition duration-200">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex ml-12 flex-col items-center md:items-start text-center md:text-left">
          <h3 className="font-semibold text-lg">GET IN TOUCH</h3>
          <p className="mt-3 text-sm">+1-000-000-0000</p>
          <p className="text-sm">greatstackdev@gmail.com</p>
          <a
            href="#"
            className="text-sm hover:text-black transition duration-200"
          >
            Instagram
          </a>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="col-span-1 md:col-span-3 text-center text-sm text-gray-500 border-t border-gray-200 pt-4 mt-10">
        &copy; {new Date().getFullYear()} greatstack.dev - All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
