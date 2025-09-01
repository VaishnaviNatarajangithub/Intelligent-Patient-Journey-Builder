import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import chatbotRoutes from "./routes/ChatbotRoutes.js";
import summarizeRoutes from "./routes/SummarizeRoutes.js";
import reportRoutes from "./routes/ReportRoutes.js";
import uploadRoute from "./routes/Upload.js";
import multimodalRoute from "./routes/multimodal.js";
import userRoutes from "./routes/userRoute.js";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // your frontend dev URL
  methods: ["GET", "POST"],
}));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/patients", summarizeRoutes);
app.use("/api/reports", reportRoutes);
// app.use("/api", uploadRoute);
// app.use("/api", audioRoute);
app.use("/api", multimodalRoute);

// Health check
app.get('/', (req, res) => {
    res.send('API Working');
});

// Serve React frontend (for production)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
