import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // ✅ Fetch product list from backend
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}api/product/list`);
      setList(response.data);
    } catch (e) {
      console.error("Error fetching product list:", e);
    }
  };

  // ✅ Remove product
  const removeProduct = async (id) => {

    try {
      const response = await axios.post(
        `${backendUrl}api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">📦 Product List</h2>

      {/* Desktop Table */}
      <div className="hidden md:grid md:grid-cols-[2fr_3fr_1fr_1fr_1fr] bg-gray-100 font-semibold p-2 border-b">
        <p>Images</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* Product Rows */}
      {list.map((item, index) => (
        <div
          key={index}
          className="grid md:grid-cols-[2fr_3fr_1fr_1fr_1fr] items-center border-b py-2 px-2 text-sm md:text-base gap-3"
        >
          {/* ✅ Show all images */}
          <div className="flex gap-2 flex-wrap">
            {item.image?.map((imgObj, i) => (
              <img
                key={i}
                src={imgObj.url}
                alt={`${item.name}-${i}`}
                className="w-12 h-12 object-cover rounded border"
              />
            ))}
          </div>

          {/* ✅ Product Info */}
          <p className="font-medium">{item.name}</p>
          <p>{item.category}</p>
          <p>
            {currency}
            {item.price}
          </p>

          {/* ✅ Action */}
          <button
            onClick={() => removeProduct(item._id)}
            className="text-red-500 font-semibold hover:underline text-center"
          >
            X
          </button>
        </div>
      ))}

      {/* ✅ Mobile Version - Card Layout */}
      <div className="md:hidden flex flex-col gap-3 mt-4">
        {list.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 flex flex-col gap-2 shadow-sm"
          >
            <div className="flex gap-2 overflow-x-auto">
              {item.image?.map((imgObj, i) => (
                <img
                  key={i}
                  src={imgObj.url}
                  alt={`${item.name}-${i}`}
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>

            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.category}</p>
              <p className="font-medium mt-1">
                {currency}
                {item.price}
              </p>
            </div>

            <button onClick={()=> removeProduct(item._id)} className="text-red-500 font-semibold cursor-pointer">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
