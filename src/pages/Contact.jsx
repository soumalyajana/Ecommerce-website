import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className='mt-24'>
      {/* Contact Section Title */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Info Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full rounded-xl md:max-w-[480px]' src={assets.contact_img} alt='' />
        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className='text-gray-500'>
            Tel: (415) 555-0132 <br />
            Email: admin@forever.com
          </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          
          {/* Contact Button */}
          <button className='bg-black text-white px-6 py-3 font-medium rounded-md hover:bg-gray-800 transition'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
