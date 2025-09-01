// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

// Dashboard Pages
import DoctorDashboard from "./Pages/Dashboard/DoctorDashboard"; 
import PatientDashboard from "./Pages/Dashboard/PatientDashboard";
import RiskAlerts from "./Pages/Dashboard/RiskAlerts";
import EducationHub from "./Pages/Dashboard/EducationHub";
import Analytics from "./Pages/Dashboard/Analytics";
import PatientJourneyReport from "./Pages/Dashboard/PatientJourneyReport";
import ReportForm from "./Pages/Dashboard/ReportForm";
import UploadData from "./Pages/Dashboard/UploadData";

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
