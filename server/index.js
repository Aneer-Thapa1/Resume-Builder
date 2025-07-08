const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const resumeRoutes = require("./routes/resumeRoutes");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const corsOptions = {
  origin: "http://localhost:5173", // or wherever your frontend is hosted
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // if you send cookies/auth headers
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/resumes", resumeRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Resume Builder API is running" });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("/{*any}", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
