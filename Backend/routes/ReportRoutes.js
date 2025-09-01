import express from "express";
import { createReport } from "../controllers/ReportController.js";

const router = express.Router();

router.post("/create", createReport);

export default router;
