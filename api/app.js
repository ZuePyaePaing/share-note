const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const noteRoutes = require("./routes/note.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use(noteRoutes);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Database connected.");
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => console.log(error));
