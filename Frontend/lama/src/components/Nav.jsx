import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

export const Nav = () => {
  return (
    <div className=" p-2 flex items-center justify-between">
      <div>
        <img src="lama-logo.PNG" alt="lama-logo" className="w-40" />
      </div>
      <div className=" flex items-center justify-between space-x-6">
        <IoSettingsOutline fontSize={40}/>
        <IoMdNotificationsOutline fontSize={45}/>
      </div>
    </div>
  );
};
