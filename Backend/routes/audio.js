// routes/audio.js
import express from "express";
import multer from "multer";
import fs from "fs";
import { Model, KaldiRecognizer } from "vosk";
import wav from "wav";
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Load Vosk model once
const model = new Model("models/vosk-model-small-en-us-0.15");

router.post("/audio", upload.single("audio"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const reader = new wav.Reader();
    const fileStream = fs.createReadStream(filePath);
    
    reader.on("format", async (format) => {
      const rec = new KaldiRecognizer(model, format.sampleRate);
      reader.on("data", (chunk) => rec.acceptWaveform(chunk));
      reader.on("end", () => {
        const result = rec.finalResult();
        res.json({ text: JSON.parse(result).text });
      });
    });

    fileStream.pipe(reader);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Voice transcription failed" });
  }
});

export default router;
