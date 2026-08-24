import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mock auth endpoint
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      user: { id: "1", email, name: "Test User" },
      token: "mock-jwt-token-" + Date.now(),
    });
  } else {
    res.status(400).json({ error: "Email and password required" });
  }
});

app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;
  if (email && password && name) {
    res.json({
      user: { id: "1", email, name },
      token: "mock-jwt-token-" + Date.now(),
    });
  } else {
    res.status(400).json({ error: "Missing fields" });
  }
});

// Mock applications endpoint
app.get("/api/applications", (req, res) => {
  res.json([
    {
      id: "1",
      company: "Google",
      position: "Software Engineer",
      status: "INTERVIEW",
      appliedDate: new Date(),
    },
    {
      id: "2",
      company: "Microsoft",
      position: "Backend Developer",
      status: "APPLIED",
      appliedDate: new Date(),
    },
  ]);
});

// Mock analytics endpoint
app.get("/api/analytics/stats", (req, res) => {
  res.json({
    total: 5,
    applied: 2,
    phoneScreen: 1,
    interview: 1,
    offer: 1,
    rejected: 0,
    withdrawn: 0,
    responseRate: 60,
    successRate: 20,
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
});
