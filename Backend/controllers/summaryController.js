import Report from "../models/Reports.js";
import JourneyStep from "../models/JourneySteps.js";

// Generate short summary
const generateConciseSummary = (reports, steps) => {
  let summary = "";

  if (reports.length) {
    const diagnoses = reports.map(r => r.diagnosis).join(", ");
    summary += `Diagnoses: ${diagnoses}. `;
    const prescriptions = reports.flatMap(r => r.prescriptions).join(", ");
    if (prescriptions) summary += `Prescriptions: ${prescriptions}. `;
  }

  if (steps.length) {
    const currentStep = steps[steps.length - 1];
    summary += `Current Step: ${currentStep.stepName} (${currentStep.status}).`;
  }

  return summary || "No records available.";
};

// Generate detailed report (for PDF)
const generateDetailedReport = (reports, steps) => {
  let reportText = `Patient Journey Detailed Report:\n\n`;

  reports.forEach((r, idx) => {
    reportText += `Report ${idx + 1}:\n`;
    reportText += `Diagnosis: ${r.diagnosis}\n`;
    if (r.prescriptions.length) reportText += `Prescriptions: ${r.prescriptions.join(", ")}\n`;
    if (r.labResults.length) reportText += `Lab Results: ${r.labResults.join(", ")}\n`;
    if (r.notes) reportText += `Doctor Notes: ${r.notes}\n`;
    reportText += "\n";
  });

  if (steps.length) {
    reportText += `Journey Steps:\n`;
    steps.forEach((s, idx) => {
      reportText += `${idx + 1}. ${s.stepName} - ${s.status} (${s.description || "No description"})\n`;
    });
  }

  return reportText;
};

// Controller
export const generatePatientSummary = async (req, res) => {
  const { patientId } = req.params;

  try {
    const reports = await Report.find({ patient: patientId }).lean();
    const steps = await JourneyStep.find({ patient: patientId }).sort({ date: 1 }).lean();

    if (!reports.length && !steps.length)
      return res.status(404).json({ message: "No data found for this patient" });

    const aiSummary = generateConciseSummary(reports, steps);
    const detailedReport = generateDetailedReport(reports, steps);

    res.json({
      patientId,
      aiSummary,
      detailedReport,
      reports,
      steps
    });
  } catch (err) {
    console.error("Error in generatePatientSummary:", err);
    res.status(500).json({ error: "Failed to generate AI summary" });
  }
};
