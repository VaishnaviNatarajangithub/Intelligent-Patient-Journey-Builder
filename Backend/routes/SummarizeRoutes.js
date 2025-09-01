import express from "express";
import { generatePatientSummary } from "../controllers/summaryController.js";

const router = express.Router();

// Fetch patient summary
router.get("/:patientId/journey", generatePatientSummary);

// Regenerate summary
router.post("/:patientId/journey/regenerate", generatePatientSummary);

export default router;
