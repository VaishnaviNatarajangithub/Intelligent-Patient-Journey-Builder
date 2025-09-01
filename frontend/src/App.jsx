// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard Pages
import DoctorDashboard from "./pages/Dashboard/DoctorDashboard"; 
import PatientDashboard from "./pages/Dashboard/PatientDashboard";
import RiskAlerts from "./pages/Dashboard/RiskAlerts";
import EducationHub from "./pages/Dashboard/EducationHub";
import Analytics from "./pages/Dashboard/Analytics";
import PatientJourneyReport from "./pages/Dashboard/PatientJourneyReport";
import ReportForm from "./pages/Dashboard/ReportForm";
import UploadData from "./pages/Dashboard/UploadData";

// Layout for sidebar
import Layout from "./components/Layout";
import SmartAssistant from "./components/SmartAssistant";

const App = () => {
  return (
    <div className="font-sans">
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/education-hub" element={<EducationHub />} /> 
        <Route path="/assistant" element={<SmartAssistant />} />

        {/* Standalone Dashboards */}
        <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
        <Route path="/PatientDashboard" element={<PatientDashboard />} />

        {/* Patient Dashboard Pages wrapped inside Layout + Sidebar */}
        <Route path="/patient" element={<Layout />}>
          <Route path="journey-report" element={<PatientJourneyReport />} />
          <Route path="risk-alerts" element={<RiskAlerts />} />
          <Route path="report-form" element={<ReportForm />} />
          <Route path="upload-data" element={<UploadData />} />
          <Route path="education-hub" element={<EducationHub />} />
        </Route>

        {/* Doctor Dashboard Pages wrapped inside Layout + Sidebar */}
        <Route path="/dashboard" element={<Layout />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="risk-alerts" element={<RiskAlerts />} />
          <Route path="patient-journey-report" element={<PatientJourneyReport />} />
          <Route path="report-form" element={<ReportForm />} />
          <Route path="upload-data" element={<UploadData />} />
          <Route path="education-hub" element={<EducationHub />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
