import React, { useState } from "react";
import { Spinner } from "@material-tailwind/react";

export const Login = ({loading,setLoading}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log({name,email})
    if(name && email){
        setLoading(true);
        setTimeout(() => {
            sessionStorage.setItem("user", JSON.stringify({ name, email }));
            setLoading(false)
          }, 3000);
    }else{
        alert('Please fill all details')
    }
  }

  return (
    <div>
      <form
        className="flex flex-col items-center justify-between my-32 "
        onSubmit={handleLogin}
      >
        <h1 className=" text-5xl text-center font-bold text-[#7E22CE] my-8">
          Sign In
        </h1>
        <input
          type="text"
          placeholder="Enter Name"
          className=" md:w-3/6 sm:w-3/4 ring-1 rounded-lg p-3 text-xl my-3 ring-gray-400 "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className=" md:w-3/6 sm:w-3/4 ring-1 rounded-lg p-3 text-xl my-3 ring-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className=" md:w-3/6 sm:w-3/4 ring-1 rounded-lg p-2.5 text-xl my-3 text-white bg-black"
          type="submit"
        >
          {loading ? <Spinner className=" m-auto" /> : "LOGIN"}
        </button>
      </form>
    </div>
  );
};
