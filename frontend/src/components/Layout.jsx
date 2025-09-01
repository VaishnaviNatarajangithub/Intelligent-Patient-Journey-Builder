// src/components/Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHeartbeat, FaUserMd, FaShieldAlt, FaHospital } from "react-icons/fa";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Patient Journey</h1>

        <nav className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-300">
            <FaHospital /> Dashboard
          </Link>
          <Link to="/risk-alerts" className="flex items-center gap-2 hover:text-blue-300">
            <FaShieldAlt /> Risk Alerts
          </Link>
          <Link to="/upload-data" className="flex items-center gap-2 hover:text-blue-300">
            <FaUserMd /> Upload Data
          </Link>
          <Link to="/engagement" className="flex items-center gap-2 hover:text-blue-300">
            <FaHeartbeat /> Engagement
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Intelligent Patient Journey</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1">
          <Outlet /> {/* Render child pages here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
