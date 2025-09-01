import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import NotFound from '../pages/NotFound.jsx'
import DoctorDashboard from '../pages/Dashboard/DoctorDashboard.jsx'
import PatientDashboard from '../pages/Dashboard/PatientDashboard.jsx'
import UploadData from '../pages/Dashboard/UploadData.jsx'
import RiskAlerts from '../pages/Dashboard/RiskAlerts.jsx'
import PatientProfile from '../pages/Dashboard/PatientProfile.jsx'
import EducationHub from '../pages/EducationHub.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Doctor Routes */}
      <Route path="/doctor/dashboard" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/doctor/upload" element={<ProtectedRoute role="doctor"><UploadData /></ProtectedRoute>} />
      <Route path="/doctor/risk-alerts" element={<ProtectedRoute role="doctor"><RiskAlerts /></ProtectedRoute>} />
      <Route path="/doctor/patient/:id" element={<ProtectedRoute role="doctor"><PatientProfile /></ProtectedRoute>} />

      {/* Patient Routes */}
      <Route path="/patient/dashboard" element={<ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>} />
      <Route path="/patient/education" element={<ProtectedRoute role="patient"><EducationHub /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
