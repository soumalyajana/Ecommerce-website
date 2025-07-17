import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="text-center p-6">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-4">
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          className="w-full sm:flex-1 outline-none border border-gray-300 rounded px-3 py-2"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-3 rounded hover:bg-gray-800 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
