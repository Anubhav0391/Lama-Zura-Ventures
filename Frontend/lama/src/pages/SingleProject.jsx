import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Upload } from "../components/Upload";

export const SingleProject = () => {

  return (
    <div className="flex ">
        <Sidebar/>
        {<Upload/>}
    </div>
  );
};
