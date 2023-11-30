import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export const Sidebar = () => {
  const [active, setActive] = useState("projects");

  return (
    <div className=" w-[25%] ring-1 p-10 bg-[#F3E8FF]">
      <img src="lama-logo.PNG" alt="lama-logo" className=" w-36" />
      <p className=" my-5">Podcast Upload Flow</p>
      <div>
        <div className={` flex items-center space-x-3 font-bold p-3 rounded-full hover:bg-[#e3d8f1] ${active=='projects'?'bg-[#7E22CE] hover:bg-[#7E22CE] text-white':''}`} onClick={()=>setActive('projects')}>
          <p className=" bg-[#d2bfe6] w-8 h-8 rounded-[50%] flex justify-center items-center">
            1
          </p>
          <p>Projects</p>
        </div>
        <div className={` flex items-center space-x-3 font-bold p-3 rounded-full hover:bg-[#e3d8f1] ${active=='widget'?'bg-[#7E22CE] hover:bg-[#7E22CE] text-white':''}`} onClick={()=>setActive('widget')}>
          <p className=" bg-[#d2bfe6] w-8 h-8 rounded-[50%] flex justify-center items-center">
            2
          </p>
          <p>Widget Configurations</p>
        </div>
        <div className={` flex items-center space-x-3 font-bold p-3 rounded-full hover:bg-[#e3d8f1] ${active=='deployment'?'bg-[#7E22CE] hover:bg-[#7E22CE] text-white':''}`} onClick={()=>setActive('deployment')}>
          <p className=" bg-[#d2bfe6] w-8 h-8 rounded-[50%] flex justify-center items-center">
            3
          </p>
          <p>Deployment</p>
        </div>
        <div className={` flex items-center space-x-3 font-bold p-3 rounded-full hover:bg-[#e3d8f1] ${active=='pricing'?'bg-[#7E22CE] hover:bg-[#7E22CE] text-white':''}`} onClick={()=>setActive('pricing')}>
          <p className=" bg-[#d2bfe6] w-8 h-8 rounded-[50%] flex justify-center items-center">
            4
          </p>
          <p>Pricing</p>
        </div>
      </div>
      <div className={` flex items-center space-x-3 font-bold p-3 rounded-full hover:bg-[#e3d8f1] mt-72`}>
          <p className=" bg-[#d2bfe6] w-8 h-8 rounded-[50%] flex justify-center items-center">
            <IoSettingsOutline/>
          </p>
          <p >Settings</p>
        </div>
    </div>
  );
};
