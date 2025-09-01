import express from "express";
import multer from "multer";
import Tesseract from "tesseract.js";
import fs from "fs";
import path from "path";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// IMAGE OCR
router.post("/image", upload.single("file"), async (req, res) => {
  try {
    const { path: filePath } = req.file;
    const { data: { text } } = await Tesseract.recognize(filePath, "eng");
    fs.unlinkSync(filePath); // cleanup
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OCR failed" });
  }
});

// AUDIO UPLOAD (for now just save file)
router.post("/audio", upload.single("audio"), (req, res) => {
  try {
    const { originalname } = req.file;
    console.log("Audio received:", originalname);
    // Later: integrate Whisper/Node speech-to-text
    res.json({ message: "Audio received. Transcription can be added." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Audio upload failed" });
  }
});

export default router;
