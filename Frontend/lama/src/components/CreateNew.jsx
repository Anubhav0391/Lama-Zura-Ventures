import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../redux/ProjectReducer/action";
import { useNavigate } from "react-router-dom";

export const CreateNew = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [Alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector((state) => state);
  const navigate=useNavigate();

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "indigo",
    "teal",
    "orange",
  ];

  const handleOpen = () => {
    setOpen((cur) => !cur);
    setAlert(false);
  };

  function handleCreate() {
    if (!name) {
      setAlert(true);
    } else {
      setLoading(true);

      axios
        .post("https://cloudy-jade-shift.cyclic.app/projects", { name })
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

  function handleSingleProject(files,id){
    sessionStorage.setItem('files',JSON.stringify(files))
    sessionStorage.setItem('projectId',JSON.stringify(id))
    navigate('/singleProject')
  }

  useEffect(() => {
    dispatch(getProjects())
  }, []);

  return isLoading ? (
    <div className=" grid  md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-24 md:gap-x-10 gap-y-14">
      {[0,0,0,0,0,0,0,0,0,0].map(el=><div
    className="inline-block h-40 animate-[spinner-grow_0.75s_linear_infinite] bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status"></div>)}
    </div>
  ) : projects ? (
    <div className=" w-10/12 m-auto">
      <div className=" flex w-full justify-between items-center my-8">
        <h1 className=" text-5xl text-center font-bold text-[#7E22CE] my-8">
          Projects
        </h1>
        <button
          className=" flex items-center justify-between text-white bg-black px-4 py-2.5 rounded-lg my-8"
          onClick={handleOpen}
        >
          <IoIosAddCircle fontSize={40} />
          <p className=" text-3xl ml-2 2xl:block md:block sm:hidden">Create New Project</p>
        </button>
        <Dialog
          size="lg"
          open={open}
          handler={handleOpen}
          className="backdrop-blur-2xl"
        >
          <Card className="mx-auto w-full">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Create Proect
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Enter Project Name
              </Typography>
              <Input
                label="Project Name"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className={`${Alert ? "block" : "hidden"}`}>
                <Typography className=" text-red-500">
                  Project name can't be empty.
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="flex items-center space-x-5 justify-end">
              <Typography
                className="ml-1 font-bold text-red-400 cursor-pointer"
                onClick={handleOpen}
              >
                Cancel
              </Typography>
              <Button onClick={handleCreate} className="bg-black text-white">
                {loading ? <Spinner className=" m-auto" /> : "Create"}
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </div>
      <div className=" grid  md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-24 md:gap-x-10 gap-y-14">
        {projects.map((el,i) => (
          <div
            key={el._id}
            className=" cursor-pointer w-full flex items-center space-x-2 rounded-2xl shadow-lg ring-1 ring-gray-400"
            onClick={()=>handleSingleProject(el.files,el._id)}
          >
            <div
              className={`text-center h-24 m-2 text-white w-24 text-6xl rounded-2xl flex items-center justify-center`}
              style={{ backgroundColor: colors[i%9] }}
            >
              {el.name[0].toUpperCase()}
            </div>
            <div className="px-3">
              <h1 className=" text-2xl mt-4 text-[#7E22CE] font-bold">
                {el.name}
              </h1>
              <p className="text-[#7E22CE]">{el.files.length} Files</p>
              <p className=" text-sm my-3 text-gray-400">
                Last edited a week ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <h1 className=" text-5xl text-center font-bold text-[#7E22CE] mt-14">
        Create a New Project
      </h1>
      <img src="lama-home.PNG" alt="lama-home" className=" m-auto w-2/6 my-8" />
      <p className=" text-[#838383] text-2xl text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam natus cum,
        illo nesciunt harum vel optioNam natus cum, illo nesciunt harum vel
        optio culpa voluptas quibusdam ipsa ab eum est id autem sunt doloremque.
        Distinctio optio culpa voluptas quibusdam, facilis repellat.
      </p>
      <button
        className=" flex items-center justify-between text-white bg-black px-4 py-2.5 rounded-lg my-8 mx-auto"
        onClick={handleOpen}
      >
        <IoIosAddCircle fontSize={40} />
        <p className=" text-3xl ml-2">Create New Project</p>
      </button>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Create Proect
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Enter Project Name
            </Typography>
            <Input
              label="Project Name"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className={`${Alert ? "block" : "hidden"}`}>
              <Typography className=" text-red-500">
                Project name can't be empty.
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="flex items-center space-x-5 justify-end">
            <Typography
              className="ml-1 font-bold text-red-400 cursor-pointer"
              onClick={handleOpen}
            >
              Cancel
            </Typography>
            <Button onClick={handleCreate} className="bg-black text-white">
              {loading ? <Spinner className=" m-auto" /> : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};
