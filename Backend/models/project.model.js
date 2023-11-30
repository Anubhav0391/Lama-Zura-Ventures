const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "file",
    },
  ],
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = ProjectModel;
