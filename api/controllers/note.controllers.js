const { validationResult } = require("express-validator");
const path = require("path");
const Note = require("../models/noteSchema");
const unlink = require("../libs/unlink");

// For Get Notes
exports.getNotes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    let totalNotes = await Note.countDocuments();
    const notes = await Note.find().sort({ title: -1 }).skip(skip).limit(limit);
    return res.status(200).json({
      isSuccess: true,
      notes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalNotes / limit),
        totalNotes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
// For Create Note
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

// For Detail Note
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

// For Get Old Note
exports.getOldNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        isSuccess: false,
        message: "Note found whit this Id",
      });
    }
    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Erroe in get old note",
      error: error.message,
    });
  }
};

// For Edit Note
exports.editNote = async (req, res, next) => {
  try {
    let cover_image = null;
    if (req.file) {
      cover_image = path.relative(__dirname, req.file.path);
      cover_image = cover_image.replace(/\\/g, "/");
      cover_image = cover_image.split("uploads/").pop();
      cover_image = "uploads/" + cover_image;
    }
    const { noteId, title, description } = req.body;

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        isSuccess: false,
        message: "Note not found",
      });
    }
    note.title = title;
    note.description = description;
    if (cover_image) {
      unlink(note.cover_image);
      note.cover_image = cover_image;
    }
    await note.save();
    return res.status(200).json({
      isSuccess: true,
      message: "Edite is Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isSuccess: false,
      message: "Error in Edit Note",
      error: error.message,
    });
  }
};

// For Delete Note
exports.deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    unlink(note.cover_image);
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
