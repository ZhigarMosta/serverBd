const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    word: {
      type: String,
      required: [true, "слово не записано"],
    },
    translation: {
      type: String,
      required: [true, "перевод незаписан"],
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model("task", taskSchema);

module.exports = ToDo;
