import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Upload } from "../components/Upload";

export const SingleProject = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    let files = JSON.parse(sessionStorage.getItem("files"));
    setFiles(files)
  }, [files]);

  return (
    <div className="flex">
        <Sidebar/>
        {<Upload/>}
    </div>
  );
};
