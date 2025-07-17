import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext); // ✅ Use useContext
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const fetchCartTotal = async () => {
            const total = await getCartAmount(); // ✅ Fetch total correctly
            setCartTotal(total);
        };
        fetchCartTotal();
    }, [getCartAmount]); // ✅ Recalculate when `getCartAmount` changes

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal:</p>
                    <p>{currency} {cartTotal.toFixed(2)}</p> {/* ✅ Correct currency formatting */}
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee.toFixed(2)}</p> {/* ✅ Format shipping fee */}
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {(cartTotal + delivery_fee).toFixed(2)}</b> {/* ✅ Calculate final amount */}
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
