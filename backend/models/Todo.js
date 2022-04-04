const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  complete: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
