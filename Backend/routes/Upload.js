import express from "express";
import multer from "multer";
import Tesseract from "tesseract.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { path } = req.file;
    const { data: { text } } = await Tesseract.recognize(path, "eng");
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OCR failed" });
  }
});

export default router;
