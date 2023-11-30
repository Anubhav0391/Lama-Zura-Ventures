import React, { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { Login } from "../components/Login";
import { CreateNew } from "../components/CreateNew";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(()=>{
    let user=JSON.parse(sessionStorage.getItem("user"));

    if(user){
        setAuth(true)
    }
  },[loading])

  return (
    <div className="w-11/12  m-auto">
      <Nav />
      {!auth?
      <Login loading={loading} setLoading={setLoading}/>:
      <CreateNew/>}
    </div>
  );
};
