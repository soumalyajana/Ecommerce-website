import React from "react";
import heroImage from "../assets/hero_img.png"; // Ensure the correct path

const Hero = () => {
  return (
    <div className="mt-28  flex flex-col sm:flex-row border border-gray-400 rounded-2xl">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ">
        <div className="text-center sm:text-left px-6 ">
          <h4 className=" prata-regular text-4xl font-bold text-gray-900">Welcome to our</h4>
          <h4 className=" prata-regular text-4xl font-bold text-gray-900">Website</h4>
          <p className="text-lg text-gray-600 mt-4">
            Discover the latest arrivals and bestsellers.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <p className="font-bold text-sm md:text-base cursor-pointer hover:underline">
              Shop Now
            </p>
            <div className="w-8 md:w-11 h-[1px] bg-gray-700"></div>
          </div>
        </div>
      </div>

      {/* Hero right side */}
      <div className="w-full sm:w-1/2">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover rounded-tr-lg rounded-br-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
