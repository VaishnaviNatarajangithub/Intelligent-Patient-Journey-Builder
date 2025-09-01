import Report from "../models/Reports.js";
import User from "../models/UserModel.js";
import { generateAIReport } from "../services/huggingFaceService.js";

export const createReport = async (req, res) => {
  try {
    const { patient, doctor, diagnosis, prescriptions, labResults, notes } = req.body;

    // Generate AI insights
    const aiInsights = await generateAIReport(diagnosis, prescriptions, labResults, notes);

    const report = new ReportModel({
      patient,
      doctor,
      diagnosis,
      prescriptions,
      labResults,
      notes,
      aiInsights,
    });

    await report.save();
    res.status(201).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * Helper: resolve a user by id OR email OR name (case-insensitive)
 * Returns the user doc or null
 */
async function resolveUser({ id, email, name, role }) {
  if (id) {
    const u = await User.findById(id);
    if (!u) return null;
    if (role && u.role !== role) return null;
    return u;
  }
  if (email) {
    const u = await User.findOne({ email: email.toLowerCase() });
    if (!u) return null;
    if (role && u.role !== role) return null;
    return u;
  }
  if (name) {
    const re = new RegExp(`^${name}$`, "i"); // exact match, case-insensitive
    const u = await User.findOne({ name: re, ...(role ? { role } : {}) });
    return u;
  }
  return null;
}

// Create report
/*export const createReport = async (req, res) => {
  try {
    const {
      patientId, patientEmail, patientName,
      doctorId, doctorEmail, doctorName,
      diagnosis, prescriptions, labResults, notes, aiInsights
    } = req.body;

    // resolve patient (require)
    const patient = await resolveUser({ id: patientId, email: patientEmail, name: patientName, role: "patient" })
      || await resolveUser({ id: patientId, email: patientEmail, name: patientName }); // fallback if patient role not enforced
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // resolve doctor (optional)
    const doctor = await resolveUser({ id: doctorId, email: doctorEmail, name: doctorName, role: "doctor" })
      || (doctorId || doctorEmail || doctorName ? null : null);

    // create
    const report = new Report({
      patient: patient._id,
      doctor: doctor ? doctor._id : undefined,
      diagnosis,
      prescriptions: prescriptions || [],
      labResults: labResults || [],
      notes,
      aiInsights,
    });

    await report.save();

    // populate for response
    const populated = await Report.findById(report._id)
      .populate("patient", "name email role")
      .populate("doctor", "name email role");

    res.status(201).json({ message: "Report created", report: populated });
  } catch (error) {
    console.error("createReport error:", error);
    res.status(500).json({ message: "Error creating report", error: error.message });
  }
}; */

// Get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("patient", "name email role")
      .populate("doctor", "name email role")
      .sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

// Get report by id
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id)
      .populate("patient", "name email role")
      .populate("doctor", "name email role");
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error: error.message });
  }
};

// Get reports by patient (accepts patientId or patientEmail or patientName via query or param)
export const getReportsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { email, name } = req.query;

    const patient = await resolveUser({ id: patientId, email, name, role: "patient" })
      || await resolveUser({ id: patientId, email, name });

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const reports = await Report.find({ patient: patient._id })
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

// Get reports by doctor (accepts doctorId or doctorEmail or doctorName)
export const getReportsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { email, name } = req.query;

    const doctor = await resolveUser({ id: doctorId, email, name, role: "doctor" })
      || await resolveUser({ id: doctorId, email, name });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const reports = await Report.find({ doctor: doctor._id })
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

// Update report
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If patientName/doctorName provided in update, resolve them to IDs
    if (updates.patientName || updates.patientEmail || updates.patientId) {
      const patient = await resolveUser({ id: updates.patientId, email: updates.patientEmail, name: updates.patientName, role: "patient" })
        || await resolveUser({ id: updates.patientId, email: updates.patientEmail, name: updates.patientName });
      if (!patient) return res.status(404).json({ message: "Patient not found" });
      updates.patient = patient._id;
      delete updates.patientId; delete updates.patientEmail; delete updates.patientName;
    }
    if (updates.doctorName || updates.doctorEmail || updates.doctorId) {
      const doctor = await resolveUser({ id: updates.doctorId, email: updates.doctorEmail, name: updates.doctorName, role: "doctor" })
        || await resolveUser({ id: updates.doctorId, email: updates.doctorEmail, name: updates.doctorName });
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });
      updates.doctor = doctor._id;
      delete updates.doctorId; delete updates.doctorEmail; delete updates.doctorName;
    }

    const updated = await Report.findByIdAndUpdate(id, { $set: updates }, { new: true })
      .populate("patient", "name email")
      .populate("doctor", "name email");

    if (!updated) return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ message: "Report updated", report: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating report", error: error.message });
  }
};

// Delete report
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Report.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error: error.message });
  }
};
