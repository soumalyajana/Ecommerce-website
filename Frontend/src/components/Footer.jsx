import React from "react";

const Footer = () => {
  return (
    <div className="mt-14 bg-white py-10 px-6 border-t border-gray-200">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 sm:mt-40 text-sm">
        {/* Brand Section */}
        <div>
          <h1 className="mb-5 text-3xl font-bold text-gray-800">Garibo</h1>
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut tenetur
            nihil harum veniam vel inventore similique repudiandae quod, commodi
            blanditiis unde itaque laborum ullam doloribus placeat omnis iure
            ex! Cum.
          </p>
        </div>

        {/* Company Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-000-000-0000</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ greatstack.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
