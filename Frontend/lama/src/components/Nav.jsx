import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

export const Nav = () => {
  return (
    <div className=" py-3 flex items-center justify-between">
      <div>
        <img src="lama-logo.PNG" alt="lama-logo" className=" w-32" />
      </div>
      <div className=" flex items-center justify-between space-x-6">
        <IoSettingsOutline fontSize={30}/>
        <IoMdNotificationsOutline fontSize={35}/>
      </div>
    </div>
  );
};
