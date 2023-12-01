import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { Table } from "./Table";
import axios from "axios";
import { getProjects } from "../redux/ProjectReducer/action";
import { useDispatch, useSelector } from "react-redux";

export const Upload = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [projectId, setProjectId] = useState('');
  const dispatch=useDispatch()
  const {projects}=useSelector(state=>state)

  useEffect(() => {
    let projectId = JSON.parse(sessionStorage.getItem("projectId"));
    let files = projects.find(el=>el._id===projectId).files;
    setFiles(files);
    setProjectId(projectId)
    console.log(files)
  }, [projects]);

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  function handleCreate() {
    if (!name || !desc) {
      alert("Please fill all details");
    } else {
      let date=new Date()
      date=""+date.getDate()+'/'+date.getMonth()+"/"+"23" +"|"+ date.getHours()+'.'+date.getMinutes()
      setLoading(true);
      axios
        .post(`https://cloudy-jade-shift.cyclic.app/files/${projectId}`, { name,description:desc,uploadedDateTime:date})
        .then((res) => {
          alert(res.data.msg);
          dispatch(getProjects())
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
          setOpen((cur) => !cur);
        });
    }
  }

  return (
    <div className=" py-14  w-full">
      <div className="flex items-center justify-between w-11/12 m-auto">
        <p className=" flex text-3xl text-gray-400">
          <MdOutlineHome fontSize={35} color="#7E22CE" /> /SampleProject /{" "}
          <span className=" text-[#7E22CE]"> Upload</span>{" "}
        </p>
        <p>
          <IoMdNotificationsOutline fontSize={35} />
        </p>
      </div>
      <h1 className=" text-5xl font-bold text-[#7E22CE] my-8 w-11/12 m-auto">
        Upload
      </h1>
      <div className=" grid  md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-20 md:gap-x-10 gap-y-10 w-11/12 m-auto">
        <div
          className=" cursor-pointer w-full flex items-center space-x-2 rounded-2xl shadow-lg ring-1 ring-gray-400"
          onClick={handleOpen}
        >
          <div
            className={`text-center h-24 m-2 text-white w-24 text-6xl rounded-2xl flex items-center justify-center`}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAAB7CAMAAADnsyomAAAAaVBMVEX/AAD/////Njb/w8P/r6//1dX/+Pj/2Nj/zs7/8/P/3Nz/y8v/qKj/WFj/5eX/gID/aGj/XFz/HBz/o6P/Skr/np7/6ur/UFD/cXH/s7P/vLz/jY3/lpb/dXX/QUH/FRX/Kir/h4f/YmKsFiU2AAAEp0lEQVR4nO2cbZuqIBCGwxTf0bQszcr6/z/yIKRmabE1gFzXeb7u7nTHwjAzwKzQF8LY9wtCAirXcbwwXN9VVWVp2xGTzVSWVdX9NAw9x3HbvwoIKXxM9c2nr0R/0Q+8tb07JskpvW028fZsNU2WXS6rP+pyybKssaztNt5sbrf0lCTHnV15LhHlf4fsE8eryvqwOf+V62tZcXrNy7UXFPNfYAbZX+en2/6cKWMd69Js40PtCiO7+UYT6YsOZSGA7N10De2krKv/AdlZzAAP2uF3yPWfHYAKbYNZ5GKBQ8xVzSCTvW6yeUWTyIU67/uFoglkHOumeq/wFTnRzfRBDXlGXutG+qj0Cdlf9ETmCsfIuW4eAcV4hLzILeRZ60fkSjeNkNJH5FQ3jZjwgEws3TBiKgfkUDeLoE4DcqSbRVDcZ6xM2Pk6WaRHNmQq390cQ9ZNIiy7Qya6SYR16pBNcRg0peqQa90k4uqQT7pBxOXfkQ3ZrluFHNlfeAr1KJsjLztPHSvhyO6iKlrvdeDInm6OP2iDGfLyM9VBe58hlxC2GjWhVRsYrYBSVQt5KupjmcuQQcbHouvCbiAsvZfHkEF2EotVQ47SnU/FkEF2Eotnv8EBwtgblQy5gTBldeUnZwthblYRQwYx1SNTDySzjlNLQZY6pU9ykOnskBbP3lpkH8TUGJlmOpLCw32LDJP5PSMjHEmZ0laLHECZetFVxpRukR0QS1PIKJAwO1pkmPx6EpkGtuBeukWGiT1nkJFvg5gf1CKDxJ6zyHQdHkHXYYsMU/acR6aZGuRBM6bIOxBL75BBvXRBkWFqRe+RkQ/mpQlFPoJY+oDcBh4gn7MKKPIVxNJHZKgp7apEprk8QHroUGSY1FgIGeH85z1cNTKd0r/+U9Uj/xx46ECmU/qXuqWnBRmRHwZaD/JPo/x/LgvIOI8B4JddtcgQu5/aGAMkAiXqkKEiuUJV8AkXL/uKQnzArERNIgWa+6lIVyVk2HKLAlLqGFJLL3KqRTCHq6pqche5ZUQZlU+ZxVpJ9eW4RS5ATKmq4t/MOyuRdLwj80TqaN65n4yjSsmnq/xAGORqkaozbH7sDhK0qLopEDJkkNWt6D7GxWHIIAGzolsvVsCQQWItRXeLtgVDNuOFBlfML52ZcxeY7dctsmPQbcQTRyYG3fmskXE3ayuOjG66QcTlIONuiWNk7F18c7zcvkOGSaVUKOmQzXm9E/XIxjjm4Y0UUOlXupqgR4Ypy8nX1u+RHSMeCHfvbRmyLzfFBFM9IJuy/xUPyGY8LTmjB2QznoLaI2ToWrsMnYsRMjZgAd4Hue+PsfzZvEdPyECHrPJ0CV6Q8WI7AHGV6AV54S8VazSBjMiCl+AD8bg71GJ7LeVoBnmpUajloHlkFC5woI9P7dle+slV8aIiUSt5aYI30bXPqxcTcaQ2eeWb7o2IXTtJ43OjCzU7x2lSTuDOI3PuIvDWZXRNY3WjnsXpNapC510HTfE+n8QJq6i+Jsmha/TJO31+Adb2+mwa67zvO33mHzC/Qh4JY1z07VS9vp1qVfJmqnm+uytniuyhp2rbUtV9aKj69w//BwOUNjC94+qNAAAAAElFTkSuQmCC"
              alt=""
            />
          </div>
          <div className="px-3">
            <h1 className=" text-2xl mt-2  font-bold">Upload</h1>
            <p className="text-2xl mt-1  font-bold">Youtube Video</p>
          </div>
        </div>
        <div
          className=" cursor-pointer w-full flex items-center space-x-2 rounded-2xl shadow-lg ring-1 ring-gray-400"
          onClick={handleOpen}
        >
          <div
            className={`text-center h-24 m-2 text-white w-24 text-6xl rounded-2xl flex items-center justify-center`}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAAB7CAMAAADnsyomAAAAaVBMVEX/AAD/////Njb/w8P/r6//1dX/+Pj/2Nj/zs7/8/P/3Nz/y8v/qKj/WFj/5eX/gID/aGj/XFz/HBz/o6P/Skr/np7/6ur/UFD/cXH/s7P/vLz/jY3/lpb/dXX/QUH/FRX/Kir/h4f/YmKsFiU2AAAEp0lEQVR4nO2cbZuqIBCGwxTf0bQszcr6/z/yIKRmabE1gFzXeb7u7nTHwjAzwKzQF8LY9wtCAirXcbwwXN9VVWVp2xGTzVSWVdX9NAw9x3HbvwoIKXxM9c2nr0R/0Q+8tb07JskpvW028fZsNU2WXS6rP+pyybKssaztNt5sbrf0lCTHnV15LhHlf4fsE8eryvqwOf+V62tZcXrNy7UXFPNfYAbZX+en2/6cKWMd69Js40PtCiO7+UYT6YsOZSGA7N10De2krKv/AdlZzAAP2uF3yPWfHYAKbYNZ5GKBQ8xVzSCTvW6yeUWTyIU67/uFoglkHOumeq/wFTnRzfRBDXlGXutG+qj0Cdlf9ETmCsfIuW4eAcV4hLzILeRZ60fkSjeNkNJH5FQ3jZjwgEws3TBiKgfkUDeLoE4DcqSbRVDcZ6xM2Pk6WaRHNmQq390cQ9ZNIiy7Qya6SYR16pBNcRg0peqQa90k4uqQT7pBxOXfkQ3ZrluFHNlfeAr1KJsjLztPHSvhyO6iKlrvdeDInm6OP2iDGfLyM9VBe58hlxC2GjWhVRsYrYBSVQt5KupjmcuQQcbHouvCbiAsvZfHkEF2EotVQ47SnU/FkEF2Eotnv8EBwtgblQy5gTBldeUnZwthblYRQwYx1SNTDySzjlNLQZY6pU9ykOnskBbP3lpkH8TUGJlmOpLCw32LDJP5PSMjHEmZ0laLHECZetFVxpRukR0QS1PIKJAwO1pkmPx6EpkGtuBeukWGiT1nkJFvg5gf1CKDxJ6zyHQdHkHXYYsMU/acR6aZGuRBM6bIOxBL75BBvXRBkWFqRe+RkQ/mpQlFPoJY+oDcBh4gn7MKKPIVxNJHZKgp7apEprk8QHroUGSY1FgIGeH85z1cNTKd0r/+U9Uj/xx46ECmU/qXuqWnBRmRHwZaD/JPo/x/LgvIOI8B4JddtcgQu5/aGAMkAiXqkKEiuUJV8AkXL/uKQnzArERNIgWa+6lIVyVk2HKLAlLqGFJLL3KqRTCHq6pqche5ZUQZlU+ZxVpJ9eW4RS5ATKmq4t/MOyuRdLwj80TqaN65n4yjSsmnq/xAGORqkaozbH7sDhK0qLopEDJkkNWt6D7GxWHIIAGzolsvVsCQQWItRXeLtgVDNuOFBlfML52ZcxeY7dctsmPQbcQTRyYG3fmskXE3ayuOjG66QcTlIONuiWNk7F18c7zcvkOGSaVUKOmQzXm9E/XIxjjm4Y0UUOlXupqgR4Ypy8nX1u+RHSMeCHfvbRmyLzfFBFM9IJuy/xUPyGY8LTmjB2QznoLaI2ToWrsMnYsRMjZgAd4Hue+PsfzZvEdPyECHrPJ0CV6Q8WI7AHGV6AV54S8VazSBjMiCl+AD8bg71GJ7LeVoBnmpUajloHlkFC5woI9P7dle+slV8aIiUSt5aYI30bXPqxcTcaQ2eeWb7o2IXTtJ43OjCzU7x2lSTuDOI3PuIvDWZXRNY3WjnsXpNapC510HTfE+n8QJq6i+Jsmha/TJO31+Adb2+mwa67zvO33mHzC/Qh4JY1z07VS9vp1qVfJmqnm+uytniuyhp2rbUtV9aKj69w//BwOUNjC94+qNAAAAAElFTkSuQmCC"
              alt=""
            />
          </div>
          <div className="px-3">
            <h1 className=" text-2xl mt-2  font-bold">Upload</h1>
            <p className="text-2xl mt-1  font-bold">Youtube Video</p>
          </div>
        </div>
        <div
          className=" cursor-pointer w-full flex items-center space-x-2 rounded-2xl shadow-lg ring-1 ring-gray-400"
          onClick={handleOpen}
        >
          <div
            className={`text-center h-24 m-2 text-white w-24 text-6xl rounded-2xl flex items-center justify-center`}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAAB7CAMAAADnsyomAAAAaVBMVEX/AAD/////Njb/w8P/r6//1dX/+Pj/2Nj/zs7/8/P/3Nz/y8v/qKj/WFj/5eX/gID/aGj/XFz/HBz/o6P/Skr/np7/6ur/UFD/cXH/s7P/vLz/jY3/lpb/dXX/QUH/FRX/Kir/h4f/YmKsFiU2AAAEp0lEQVR4nO2cbZuqIBCGwxTf0bQszcr6/z/yIKRmabE1gFzXeb7u7nTHwjAzwKzQF8LY9wtCAirXcbwwXN9VVWVp2xGTzVSWVdX9NAw9x3HbvwoIKXxM9c2nr0R/0Q+8tb07JskpvW028fZsNU2WXS6rP+pyybKssaztNt5sbrf0lCTHnV15LhHlf4fsE8eryvqwOf+V62tZcXrNy7UXFPNfYAbZX+en2/6cKWMd69Js40PtCiO7+UYT6YsOZSGA7N10De2krKv/AdlZzAAP2uF3yPWfHYAKbYNZ5GKBQ8xVzSCTvW6yeUWTyIU67/uFoglkHOumeq/wFTnRzfRBDXlGXutG+qj0Cdlf9ETmCsfIuW4eAcV4hLzILeRZ60fkSjeNkNJH5FQ3jZjwgEws3TBiKgfkUDeLoE4DcqSbRVDcZ6xM2Pk6WaRHNmQq390cQ9ZNIiy7Qya6SYR16pBNcRg0peqQa90k4uqQT7pBxOXfkQ3ZrluFHNlfeAr1KJsjLztPHSvhyO6iKlrvdeDInm6OP2iDGfLyM9VBe58hlxC2GjWhVRsYrYBSVQt5KupjmcuQQcbHouvCbiAsvZfHkEF2EotVQ47SnU/FkEF2Eotnv8EBwtgblQy5gTBldeUnZwthblYRQwYx1SNTDySzjlNLQZY6pU9ykOnskBbP3lpkH8TUGJlmOpLCw32LDJP5PSMjHEmZ0laLHECZetFVxpRukR0QS1PIKJAwO1pkmPx6EpkGtuBeukWGiT1nkJFvg5gf1CKDxJ6zyHQdHkHXYYsMU/acR6aZGuRBM6bIOxBL75BBvXRBkWFqRe+RkQ/mpQlFPoJY+oDcBh4gn7MKKPIVxNJHZKgp7apEprk8QHroUGSY1FgIGeH85z1cNTKd0r/+U9Uj/xx46ECmU/qXuqWnBRmRHwZaD/JPo/x/LgvIOI8B4JddtcgQu5/aGAMkAiXqkKEiuUJV8AkXL/uKQnzArERNIgWa+6lIVyVk2HKLAlLqGFJLL3KqRTCHq6pqche5ZUQZlU+ZxVpJ9eW4RS5ATKmq4t/MOyuRdLwj80TqaN65n4yjSsmnq/xAGORqkaozbH7sDhK0qLopEDJkkNWt6D7GxWHIIAGzolsvVsCQQWItRXeLtgVDNuOFBlfML52ZcxeY7dctsmPQbcQTRyYG3fmskXE3ayuOjG66QcTlIONuiWNk7F18c7zcvkOGSaVUKOmQzXm9E/XIxjjm4Y0UUOlXupqgR4Ypy8nX1u+RHSMeCHfvbRmyLzfFBFM9IJuy/xUPyGY8LTmjB2QznoLaI2ToWrsMnYsRMjZgAd4Hue+PsfzZvEdPyECHrPJ0CV6Q8WI7AHGV6AV54S8VazSBjMiCl+AD8bg71GJ7LeVoBnmpUajloHlkFC5woI9P7dle+slV8aIiUSt5aYI30bXPqxcTcaQ2eeWb7o2IXTtJ43OjCzU7x2lSTuDOI3PuIvDWZXRNY3WjnsXpNapC510HTfE+n8QJq6i+Jsmha/TJO31+Adb2+mwa67zvO33mHzC/Qh4JY1z07VS9vp1qVfJmqnm+uytniuyhp2rbUtV9aKj69w//BwOUNjC94+qNAAAAAElFTkSuQmCC"
              alt=""
            />
          </div>
          <div className="px-3">
            <h1 className=" text-2xl mt-2  font-bold">Upload</h1>
            <p className="text-2xl mt-1  font-bold">Youtube Video</p>
          </div>
        </div>
      </div>
      {files?.length?<Table rows={files} setRows={setFiles}/>:<div>
        <p className=" text-gray-400 text-center text-xl my-5">or</p>
        <img
          src="upload-lama.PNG"
          alt=""
          className=" m-auto w-11/12"
          onClick={handleOpen}
        />
      </div>}
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="backdrop-blur-2xl"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Upload File
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Enter file Name
            </Typography>
            <Input
              label="File Name"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Enter File Description
            </Typography>
            <Input
              label="File Description"
              size="lg"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </CardBody>
          <CardFooter className="flex items-center space-x-5 justify-end">
            <Typography
              className="ml-1 font-bold text-red-400 cursor-pointer"
              onClick={handleOpen}
            >
              Cancel
            </Typography>
            <Button onClick={handleCreate} className="bg-black text-white">
              {loading ? <Spinner className=" m-auto" /> : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};
