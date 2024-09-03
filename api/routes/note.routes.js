const express = require("express");
const routes = express.Router();
const { body } = require("express-validator");
const noteControllers = require("../controllers/note.controllers");

//Get notes
routes.get("/notes", noteControllers.getNotes);
// Post Create Note
routes.post(
  "/create",
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 5 })
      .withMessage("Title must be least 5 characters long"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 15 })
      .withMessage("Title must be least 15 characters long"),
  ],
  noteControllers.createNote
);
//Get Single Note
routes.get("/notes/:noteId", noteControllers.getSingleNote);
module.exports = routes;
