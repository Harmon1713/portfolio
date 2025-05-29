const Feedback = require("../models/Feedback");
const analyzeSentiment = require("../utils/sentimentAnalysis");

exports.submitFeedback = async (req, res) => {
  try {
    console.log("Incoming feedback:", req.body);

    const { message, tag } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const sentiment = analyzeSentiment(message);
    const feedback = new Feedback({ message, tag, sentiment });

    await feedback.save();
    res.status(201).json({ success: true, feedback });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};

exports.getAllFeedback = async (req, res) => {
  // your logic here
};
