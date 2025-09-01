// routes/userRoute.js
import express from "express";
import JourneyStep from "../models/JourneySteps.js";
import Report from "../models/Reports.js";
import { hfSummarize } from "../utils/hfClient.js";
import Appointment from "../models/AppointmentModel.js"; 


import { registerUser, loginUser } from "../controllers/UserController.js";
import { 
  createJourneyStep,
  getAllJourneySteps,
  getJourneyStepById,
  getJourneyStepsByPatient,
  updateJourneyStep,
  deleteJourneyStep
} from "../controllers/JourneyStepController.js"; 

import { 
  createPatientProfile, 
  getPatients, 
  getPatientById, 
  updatePatientProfile, 
  deletePatientProfile 
} from "../controllers/PatientProfileController.js";

import {
  createDoctorProfile,
  getDoctors,
  getDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile,
} from "../controllers/DoctorProfileController.js";

import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/AppointmentController.js";

import {
  createReport,
  getAllReports,
  getReportById,
  getReportsByPatient,
  getReportsByDoctor,
  updateReport,
  deleteReport
} from "../controllers/ReportController.js";

const router = express.Router();

// ---------------- USER AUTH ROUTES ----------------
router.post("/register", registerUser);
router.post("/login", loginUser);

// ---------------- PATIENT ROUTES ----------------
router.post("/patients", createPatientProfile);
router.get("/patients", getPatients);
router.get("/patients/:id", getPatientById);
router.put("/patients/:id", updatePatientProfile);
router.delete("/patients/:id", deletePatientProfile);

// ---------------- DOCTOR ROUTES ----------------
router.post("/doctors", createDoctorProfile);
router.get("/doctors", getDoctors);
router.get("/doctors/:userId", getDoctorProfile);
router.put("/doctors/:userId", updateDoctorProfile);
router.delete("/doctors/:userId", deleteDoctorProfile);

// ---------------- APPOINTMENT ROUTES ----------------
router.post("/appointments", createAppointment);
router.get("/appointments", getAllAppointments);
router.get("/appointments/:id", getAppointmentById);
router.put("/appointments/:id", updateAppointment);
router.delete("/appointments/:id", deleteAppointment);

// ---------------- REPORT ROUTES ----------------
router.post("/reports", createReport);
router.get("/reports", getAllReports);
router.get("/reports/:id", getReportById);
router.get("/reports/patient/:patientId", getReportsByPatient);
router.get("/reports/doctor/:doctorId", getReportsByDoctor);
router.put("/reports/:id", updateReport);
router.delete("/reports/:id", deleteReport);

// ---------------- JOURNEY STEP ROUTES ----------------
router.post("/journeysteps", createJourneyStep);
router.get("/journeysteps", getAllJourneySteps);
router.get("/journeysteps/:id", getJourneyStepById);
router.get("/journeysteps/patient/:patientId", getJourneyStepsByPatient);
router.put("/journeysteps/:id", updateJourneyStep);
router.delete("/journeysteps/:id", deleteJourneyStep);


// Add /dashboard to the route
router.get("/dashboard/patients/:id/stats", async (req, res) => {
  try {
    const patientId = req.params.id;

    const appointmentsCount = await Appointment.countDocuments({ patientId });
    const reportsCount = await Report.countDocuments({ patientId });

    // Example health score calculation
    const healthScore = Math.max(0, 100 - appointmentsCount * 2 - reportsCount);

    // Notifications (make sure Notification model exists)
    //const notifications = await Notification.countDocuments({ patientId, read: false });

    res.json({
      appointments: appointmentsCount,
      reports: reportsCount,
      healthScore,
      //notifications,
    });
  } catch (err) {
    console.error("Error fetching patient stats:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// ---------------- PATIENT JOURNEY SUMMARY ----------------
router.get("/patients/:patientId/journey", async (req, res) => {
  const { patientId } = req.params;
  try {
    const steps = await JourneyStep.find({ patientId }).sort({ date: 1 });
    const reports = await Report.find({ patient: patientId }).sort({ createdAt: -1 });

    let summary = {
      doctorSummary: "No AI summary available.",
      patientSummary: "No AI summary available.",
      updatedAt: new Date().toISOString(),
    };

    if (reports.length) {
      const latestReport = reports[0];
      let aiSummary = latestReport.aiInsights;

      if (!aiSummary) {
        try {
          const textToSummarize = latestReport.notes || latestReport.diagnosis || "No content to summarize";
          aiSummary = await hfSummarize(textToSummarize);
          if (!aiSummary) aiSummary = "AI summary could not be generated";

          latestReport.aiInsights = aiSummary;
          await latestReport.save();
        } catch (err) {
          console.error("HF summarize failed:", err);
          aiSummary = "AI summary could not be generated";
          latestReport.aiInsights = aiSummary;
          await latestReport.save();
        }
      }

      summary = {
        doctorSummary: aiSummary,
        patientSummary: aiSummary,
        updatedAt: latestReport.updatedAt
          ? latestReport.updatedAt.toISOString()
          : new Date().toISOString(),
      };
    }

    res.json({ steps, reports, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch patient journey" });
  }
});

// ---------------- REGENERATE AI SUMMARY ----------------
router.post("/patients/:patientId/journey/regenerate", async (req, res) => {
  const { patientId } = req.params;
  try {
    const reports = await Report.find({ patient: patientId }).sort({ createdAt: -1 });

    if (!reports.length) {
      return res.status(404).json({ error: "No reports found for this patient" });
    }

    const latestReport = reports[0];
    let aiSummary;

    try {
      const textToSummarize = latestReport.notes || latestReport.diagnosis || "No content to summarize";
      aiSummary = await hfSummarize(textToSummarize);
      if (!aiSummary) aiSummary = "AI summary could not be generated";

      latestReport.aiInsights = aiSummary;
      await latestReport.save();
    } catch (err) {
      console.error("HF summarize failed:", err);
      aiSummary = "AI summary could not be generated";
      latestReport.aiInsights = aiSummary;
      await latestReport.save();
    }

    res.json({
      summary: {
        doctorSummary: aiSummary,
        patientSummary: aiSummary,
        updatedAt: latestReport.updatedAt
          ? latestReport.updatedAt.toISOString()
          : new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to regenerate AI summary" });
  }
});


export default router;
