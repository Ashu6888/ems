import React, { useState, useEffect, useRef } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling when login page is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling when unmounting
    };
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    };

    // Attach event listener when component mounts
    document.addEventListener("focusin", handleFocus);

    return () => {
      // Cleanup event listener when component unmounts
      document.removeEventListener("focusin", handleFocus);
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="border-2 rounded-xl border-emerald-600 p-6 sm:p-10 md:p-20 w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#1c1c1c]"
        ref={inputRef}
      >
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400"
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="password"
            placeholder="Enter password"
          />
          <button className="mt-7 w-full text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 rounded-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
