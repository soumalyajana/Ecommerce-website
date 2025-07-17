import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-6 sm:gap-2 text-center py-6 mt-16">
      {/* Exchange Policy */}
      <div className="w-full sm:w-1/3">
        <img src={assets.exchange_icon} className="w-12 m-auto mb-3" alt="Exchange Icon" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">Hassle-free exchange on all orders.</p>
      </div>

      {/* Quality Guarantee */}
      <div className="w-full sm:w-1/3">
        <img src={assets.quality_icon} className="w-12 m-auto mb-3" alt="Quality Icon" />
        <p className="font-semibold">Premium Quality</p>
        <p className="text-gray-400">We ensure top-notch quality in all our products.</p>
      </div>

      {/* Customer Support */}
      <div className="w-full sm:w-1/3">
        <img src={assets.support_img} className="w-12 m-auto mb-3" alt="Support Icon" />
        <p className="font-semibold">24/7 Customer Support</p>
        <p className="text-gray-400">We are here for you anytime, anywhere.</p>
      </div>
    </div>
  );
};

export default OurPolicy;
