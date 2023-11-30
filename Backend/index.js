const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const projectRouter = require("./routes/project.routes");
const fileRouter = require("./routes/file.routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects',projectRouter);
app.use('/files',fileRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
});