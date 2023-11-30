import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { SingleProject } from "../pages/SingleProject";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/singleProject" element={<SingleProject/>} />
      <Route path="*" element={<p className=" text-9xl flex items-center justify-center h-[100vh]">404 : Not Found</p>} />
    </Routes>
  );
};

export default AllRoutes;
