import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  diagnosis: { type: String, required: true },
  prescriptions: [{ type: String }],   // list of medicines
  labResults: [{ type: String }],      // links or descriptions of lab test results
  notes: { type: String },             // doctor’s additional comments
  aiInsights: { type: String },        // AI-generated descriptive report
}, { timestamps: true });

const ReportModel = mongoose.models.Report || mongoose.model("Report", ReportSchema);
export default ReportModel;
