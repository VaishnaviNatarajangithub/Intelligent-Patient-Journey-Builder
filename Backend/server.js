import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import chatbotRoutes from "./routes/ChatbotRoutes.js";
import summarizeRoutes from "./routes/SummarizeRoutes.js";
import reportRoutes from "./routes/ReportRoutes.js";
import uploadRoute from "./routes/Upload.js";
import userRoutes from "./routes/userRoute.js";

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "*", // allow all origins in production; you can restrict later
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/patients", summarizeRoutes);
app.use("/api/reports", reportRoutes);
// app.use("/api/upload", uploadRoute); // uncomment if needed

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: "API Working" });
});

// Serve React frontend (production)
const buildPath = path.join(__dirname, "../frontend/build");

if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(buildPath, "index.html"));
    });
} else {
    console.warn("Warning: Frontend build folder not found. Run 'npm run build' in frontend.");
}

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
