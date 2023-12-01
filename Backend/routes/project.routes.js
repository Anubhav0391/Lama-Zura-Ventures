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

projectRouter.get('/:projectId', async (req, res) => {
  try {

    const project = await ProjectModel.findById(req.params.projectId).populate('files');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
