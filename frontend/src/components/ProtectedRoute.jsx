import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function ProtectedRoute({ children, role }) {
  const { user } = useApp()
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />

  if (role && user.role !== role) {
    const redirect = user.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'
    return <Navigate to={redirect} replace />
  }

  return children
}
