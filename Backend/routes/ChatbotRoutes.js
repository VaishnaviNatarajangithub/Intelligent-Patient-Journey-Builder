import express from "express";
import { chatWithGemini } from "../controllers/ChatbotController.js";

const router = express.Router();

// POST route for chatbot
router.post("/", chatWithGemini);

export default router;
