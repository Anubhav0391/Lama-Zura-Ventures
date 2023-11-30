const express = require("express");
const ProjectModel = require("../models/project.model");
const projectRouter = express.Router();

projectRouter.post("/", async (req, res) => {
  try {
    const newProject = new ProjectModel(req.body);
    await newProject.save();
    res.status(200).send({ msg: "Project created successfully" });
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

projectRouter.get("/",async(req,res)=>{
    try {
        const projects=await ProjectModel.find().populate("files");
        res.status(200).send({projects})
    } catch (error) {
        res.status(400).send({ err: err.message });
    }
})

module.exports = projectRouter;
