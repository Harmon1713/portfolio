const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration to allow GitHub Pages frontend
const corsOptions = {
  origin: "https://harmon1713.github.io", // Your GitHub Pages domain
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: false
};

// Apply CORS before all routes/middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests globally

// Middleware to parse JSON
app.use(express.json());

// Routes
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

// Health check route
app.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "https://harmon1713.github.io");
  res.send("Feedback API is running");
});

// Simple ping route for wake-up testing
app.get("/ping", (req, res) => {
  res.set("Access-Control-Allow-Origin", "https://harmon1713.github.io");
  res.send("pong");
});

// MongoDB connection and server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
