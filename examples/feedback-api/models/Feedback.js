const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    enum: ["bug", "suggestion", "praise", "other"],
    default: "other"
  },
  sentiment: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
