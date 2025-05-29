const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://harmon1713.github.io'
}));


// Import your feedback routes
const feedbackRoutes = require("./routes/feedbackRoutes");

// Mount your feedback routes under /api/feedback
app.use("/api/feedback", feedbackRoutes);

// Optional root route (just for testing)
app.get("/", (req, res) => {
  res.send("Feedback API is running");
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});
