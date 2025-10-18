
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { initDB } from "./database.js";
import cors from "cors";
import optimizeRouter from "./routes/optimize.js";

const app = express();

// Enable CORS
// Option 1: Allow all origins (good for development)
app.use(cors());

// Option 2: Allow only your frontend origin (recommended)
// app.use(cors({ origin: "http://localhost:5174" }));

// Middleware to parse JSON
app.use(express.json());

await initDB();

// Routes
app.use("/api/optimize", optimizeRouter);

// Optional: basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



