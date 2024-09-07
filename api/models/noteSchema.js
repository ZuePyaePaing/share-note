const { Schema, model } = require("mongoose");

const nodeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [5, "Title must be at least 5 characters long"], // Minimum length
      maxlength: [30, "Title must be less than 30 characters"],
    },
    description: {
      type: String,
      required: true,
      minlength: [15, "Title must be at least 15 characters long"],
    },
    cover_image: { type: String },
    author: { type: String, default: "Anyoumnet" },
  },
  { timestamps: true }
);

module.exports = model("Node", nodeSchema);
