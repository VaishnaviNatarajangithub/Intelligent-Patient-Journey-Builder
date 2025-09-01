// models/Summary.js
import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  doctorSummary: String,
  patientSummary: String,
  sourceReports: [String], // optional list of report ids used
  sourceSteps: [String],
  updatedAt: Date
}, { timestamps: true });

export default mongoose.model("Summary", summarySchema);
