import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext); // ✅ Fixed useCurrency issue

    return (
        <Link to={`/product/${id}`} className="block">
            <div className="overflow-hidden rounded-lg">
                <img 
                    className="hover:scale-110 transition-transform ease-in-out duration-300 w-full h-auto" 
                    src={image?.[0] || '/placeholder.jpg'} // ✅ Handle potential undefined image
                    alt={name} 
                />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className="text-sm font-medium">{currency}{price}</p> {/* ✅ Fixed currency display */}
        </Link>
    );
};

export default ProductItem;
