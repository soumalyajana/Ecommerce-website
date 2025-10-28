import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestSeller', bestSeller)
      formData.append('sizes', JSON.stringify(sizes))

      images.forEach((img, index) => {
  if (img) formData.append(`image${index + 1}`, img);
});



      const response = await axios.post(
        `${backendUrl}api/product/add`,
        formData,
        { headers: { token } }
      )

      console.log('✅ Product added successfully:', response.data)
    } catch (error) {
      console.error('❌ Error adding product:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`}>
              <img
                className='w-20 h-20 object-cover rounded-md border'
                src={images[num - 1] ? URL.createObjectURL(images[num - 1]) : assets.upload_area}
                alt=''
              />
              <input
                type='file'
                id={`image${num}`}
                hidden
                onChange={(e) => {
                  const newImages = [...images]
                  newImages[num - 1] = e.target.files[0]
                  setImages(newImages)
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          className='w-full max-w-[500px] px-4 py-2'
          type='text'
          placeholder='Type here'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          className='w-full max-w-[500px] px-4 py-2'
          placeholder='Write content here'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select
            className='w-full px-4 py-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='Men'>Men</option>
            <option value='Woman'>Woman</option>
            <option value='Kids'>Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select
            className='w-full px-4 py-2'
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value='Topwear'>Topwear</option>
            <option value='Bottomwear'>Bottomwear</option>
            <option value='Winterwear'>Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            className='w-full px-3 py-2 sm:w-[120px]'
            type='number'
            placeholder='25'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <p
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
              className={`px-3 py-1 cursor-pointer rounded ${
                sizes.includes(size)
                  ? 'bg-black text-white'
                  : 'bg-slate-200'
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          type='checkbox'
          id='bestseller'
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
        />
        <label className='cursor-pointer' htmlFor='bestseller'>
          Add to Bestseller
        </label>
      </div>

      <button
        type='submit'
        className='w-28 py-3 mt-4 bg-black text-white rounded-2xl'
      >
        Add Product
      </button>
    </form>
  )
}

export default Add
