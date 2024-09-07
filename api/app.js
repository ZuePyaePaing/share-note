const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const noteRoutes = require("./routes/note.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const port = process.env.PORT || 3000;

// Ensure /uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file storage
const storageConfigure = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random()) * 1e9;
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

// Configure file filter
const fileFilterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// Set up Multer with Configurations
const upload = multer({
  storage: storageConfigure,
  fileFilter: fileFilterConfigure,
  limits: { fileSize: 1024 * 1024 * 5 },
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Initialize Multer
app.use(upload.single("cover_image"));
app.use("/uploads", express.static(uploadDir));
// Routes
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
