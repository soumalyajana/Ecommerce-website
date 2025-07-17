import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from '../components/Title'; 


const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext); // Ensure correct context
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy =products.slice();
      productsCopy = productsCopy.filter((item)=>category === item.category);
      productsCopy = productsCopy.filter((item)=>subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 5)); // Store only top 5 related products
    }
  }, [products]); // Dependencies

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4'>
        {related.map((item, index)=>(
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}></ProductItem>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
