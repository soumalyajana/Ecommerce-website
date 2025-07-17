import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [ method , setMethod ] = useState('cod');
  const {navigate} = useContext(ShopContext);
  return (
    <div className="flex flex-col mt-20 sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Last name"
              className="border p-2 rounded w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            className="border p-2 rounded w-full mt-4"
          />
          <input
            type="text"
            placeholder="Street"
            className="border p-2 rounded w-full mt-4"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="City"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="State"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Zipcode"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Country"
              className="border p-2 rounded w-full"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded w-full mt-4"
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4 ' src={assets.stripe_logo} alt=""/>
            </div>
            <div onClick={()=>setMethod('razopay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 h-3.5 border rounded-full ${method === 'razopay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt=""/>
            </div>
            <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={()=>navigate('/Order')} className='w-60 px-8 py-3 mt-6 text-sm rounded-md transition-colors bg-black text-white hover:bg-gray-800'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

























//import { useState } from "react";
// import Title from "../components/Title";

// export default function CheckoutPage() {
//   const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");

//   return (
//     <div className="flex justify-center mt-24 bg-gray-50 min-h-screen">
//       {/* Delivery Information */}
//       <div>
//         <Title text1={"DELIVERY"} text2={"INFORMATION"} />
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="First name"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="Last name"
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <input
//           type="email"
//           placeholder="Email address"
//           className="border p-2 rounded w-full mt-4"
//         />
//         <input
//           type="text"
//           placeholder="Street"
//           className="border p-2 rounded w-full mt-4"
//         />
//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <input
//             type="text"
//             placeholder="City"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="State"
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <input
//             type="text"
//             placeholder="Zipcode"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="Country"
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <input
//           type="text"
//           placeholder="Phone"
//           className="border p-2 rounded w-full mt-4"
//         />
//       </div>

//       {/* Cart Totals & Payment */}
//       <div className="">
//         <Title text1={"CART"} text2={"TOTALS"} />
//         <div className="mb-4">
//           <div className="flex justify-between text-gray-600">
//             <span>Subtotal</span>
//             <span>$432.00</span>
//           </div>
//           <div className="flex justify-between text-gray-600">
//             <span>Shipping Fee</span>
//             <span>$10.00</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg mt-2">
//             <span>Total</span>
//             <span>$442.00</span>
//           </div>
//         </div>

//         <Title text1={"PAYMENT"} text2={"METHOD"} />
//         <div className="flex flex-col mt-2">
//           <label className="flex items-center gap-2 border p-2 rounded cursor-pointer">
//             <input
//               type="radio"
//               name="payment"
//               value="stripe"
//               onChange={() => setPaymentMethod("stripe")}
//             />
//             <span className="text-blue-500 font-semibold">Stripe</span>
//           </label>
//           <label className="flex items-center gap-2 border p-2 rounded cursor-pointer mt-2">
//             <input
//               type="radio"
//               name="payment"
//               value="razorpay"
//               onChange={() => setPaymentMethod("razorpay")}
//             />
//             <span className="text-blue-500 font-semibold">Razorpay</span>
//           </label>
//           <label className="flex items-center gap-2 border p-2 rounded cursor-pointer mt-2 bg-gray-200">
//             <input
//               type="radio"
//               name="payment"
//               value="cash_on_delivery"
//               checked={paymentMethod === "cash_on_delivery"}
//               onChange={() => setPaymentMethod("cash_on_delivery")}
//             />
//             <span className="font-semibold">Cash on Delivery</span>
//           </label>
//         </div>

//         <button className="w-full bg-black text-white p-3 rounded-lg mt-6 font-semibold hover:bg-gray-800">
//           PLACE ORDER
//         </button>
//       </div>
//     </div>
//   );
// }
