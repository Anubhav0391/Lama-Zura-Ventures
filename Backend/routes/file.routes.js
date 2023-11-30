const express = require("express");
const fileRouter = express.Router();
const FileModal = require("../models/file.model");
const ProjectModel = require("../models/project.model");

fileRouter.post("/:id", async (req, res) => {
  try {
    const newFile = new FileModal(req.body);
    await newFile.save();

    await ProjectModel.findByIdAndUpdate(
      req.params.id,
      { $push: { files: newFile._id } },
      { new: true }
    );

    res.status(200).send({ msg: "File uploaded successfully" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

fileRouter.patch('/:id', async (req, res) => {
    try {
      await FileModal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.status(200).send({msg:"description edited successfully"});
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  });
  

  fileRouter.delete('/:id', async (req, res) => {
    try {
      await FileModal.findByIdAndDelete(req.params.id);
  
      res.status(200).json({msg:"file deleted successfully"});
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  

module.exports = fileRouter;
