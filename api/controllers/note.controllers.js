const { validationResult } = require("express-validator");
const path = require("path");
const Note = require("../models/noteSchema");

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ title: -1 });
    return res.status(200).json({ isSuccess: true, notes });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.createNote = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({
      isSuccess: false,
      message: "Validation error",
      errors: errors.array()[0],
    });
  }
  try {
    const { title, description } = req.body;
    let cover_image = null;
    if (req.file) {
      cover_image = path.relative(__dirname, req.file.path);
      cover_image = cover_image.replace(/\\/g, "/");
      cover_image = cover_image.split("uploads/").pop();
      cover_image = "uploads/" + cover_image;
    }
    await Note.create({ title, description, cover_image });
    return res.status(201).json({
      isSuccess: true,
      message: "Created note successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getSingleNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        isSuccess: false,
        message: "Note found whit this Id",
      });
    }
    return res.status(200).json({
      isSuccess: true,
      note,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid note id",
      });
    }
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.editNote = async (req, res, next) => {
  try {
    const {} = req.body;
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Error in Edit Note",
      error: error.message,
    });
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    await Note.findByIdAndDelete(noteId);
    return res.status(204);
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Errro in Edit Note",
      error: error.message,
    });
  }
};
