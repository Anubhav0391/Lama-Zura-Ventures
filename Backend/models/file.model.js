const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  uploadedDateTime: { type: String, required: true },
});

const FileModal = mongoose.model("file", fileSchema);

module.exports = FileModal;
