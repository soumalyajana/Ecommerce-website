import { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex mt-40 mb-32 flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? "" : (
        <input type="text" className="w-full rounded-xl px-3 py-2 border border-gray-800" placeholder="Full Name" />
      )}

      <input type="email" className="w-full px-3 rounded-xl py-2 border border-gray-800" placeholder="Email" required />
      <input type="password" className="w-full px-3 rounded-xl py-2 border border-gray-800" placeholder="Password" required />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer text-black">Forgot your password?</p>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer text-black">
            Create an account
          </p>
        ) : (
          <p onClick={() => setCurrentState("Login")} className="cursor-pointer text-black">
            Login Instead
          </p>
        )}
      </div>

      <button className="w-96 px-8 py-3 mt-6 text-sm rounded-md transition-colors bg-black text-white hover:bg-gray-800">
        {currentState === "Login" ? "Sign Up" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
