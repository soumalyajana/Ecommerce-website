import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity , navigate} = useContext(ShopContext);
  const [cartData, setCarData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCarData(tempData);
  }, [cartItems, products]); // ✅ Fix infinite loop

  return (
    <div className="border-t mt-24 pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null; // ✅ Avoid crash if productData is undefined

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20 rounded-xl" src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <p className="text-xs">Size: {item.size}</p>
                  <p className="text-xs">Quantity: {item.quantity}</p>
                  <p className="text-xs">Price: {currency} {productData.price}</p>
                </div>
              </div>
              <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size, Number(e.target.value)) } className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 rounded-xl' type="number" min={1} defaultValue={item.quantity} />
              <img onClick={()=>updateQuantity(item._id, item.size,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt=''/>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className='w-full sm:w-[450px] '>
          <CartTotal/>
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/place-order')} className='w-60 px-8 py-3 mt-6 text-sm rounded-md transition-colors bg-black text-white hover:bg-gray-800'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
