// backend/controllers/chatbotController.js
/*import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in your .env
});

export const handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ reply: "Message is empty!" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [
        { role: "system", content: "You are a helpful medical assistant." },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const botReply = response.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error" });
  }
};
*/

import { GoogleGenerativeAI } from "@google/generative-ai";

export const chatWithGemini = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate response
    const result = await model.generateContent(message);

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Gemini" });
  }
};
