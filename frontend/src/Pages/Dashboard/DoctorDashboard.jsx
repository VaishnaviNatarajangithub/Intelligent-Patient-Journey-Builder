// src/Pages/Dashboard/DoctorDashboard.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // if shadcn/ui is installed
import { Stethoscope, Calendar, Users, FileText, BarChart2, AlertCircle, Clipboard,Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const sidebarItems = [
  { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart2 size={20} /> },
  { label: "Risk Alerts", href: "/dashboard/risk-alerts", icon: <AlertCircle size={20} /> },
  { label: "Patient Journey Report", href: "/dashboard/patient-journey-report", icon: <Clipboard size={20} /> },
  { label: "Report Form", href: "/dashboard/report-form", icon: <FileText size={20} /> },
  { label: "Upload Data", href: "/dashboard/upload-data", icon: <Upload size={20} /> },
  { label: "Education Hub", href: "/dashboard/education-hub", icon: <Users size={20} /> },
];



const DoctorDashboard = () => {
  const location = useLocation();


  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r min-h-screen p-4 shadow-lg hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-gray-700">Dashboard</h2>
        <nav className="space-y-2">
          {sidebarItems.map((it) => {
            const isActive = location.pathname === it.href;
            return (
              <Link
                key={it.href}
                to={it.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white font-semibold shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {it.icon}
                <span>{it.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctor Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Stethoscope className="text-blue-500" size={32} />
              <div>
                <p className="text-gray-500 text-sm">Patients</p>
                <p className="text-2xl font-semibold">120</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Calendar className="text-green-500" size={32} />
              <div>
                <p className="text-gray-500 text-sm">Appointments</p>
                <p className="text-2xl font-semibold">15 Today</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Users className="text-purple-500" size={32} />
              <div>
                <p className="text-gray-500 text-sm">Active Patients</p>
                <p className="text-2xl font-semibold">45</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <FileText className="text-orange-500" size={32} />
              <div>
                <p className="text-gray-500 text-sm">Reports</p>
                <p className="text-2xl font-semibold">8 Pending</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="p-3">Patient</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">John Doe</td>
                <td className="p-3">23 Aug 2025</td>
                <td className="p-3">10:30 AM</td>
                <td className="p-3 text-green-600 font-semibold">Confirmed</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Priya Sharma</td>
                <td className="p-3">23 Aug 2025</td>
                <td className="p-3">11:00 AM</td>
                <td className="p-3 text-yellow-600 font-semibold">Pending</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3">Arun Kumar</td>
                <td className="p-3">23 Aug 2025</td>
                <td className="p-3">11:30 AM</td>
                <td className="p-3 text-red-600 font-semibold">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reports Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Reports</h2>
          <ul className="space-y-3">
            <li className="p-3 border rounded-lg hover:bg-gray-50 flex justify-between">
              <span>Blood Test Report - John Doe</span>
              <span className="text-blue-500 cursor-pointer">View</span>
            </li>
            <li className="p-3 border rounded-lg hover:bg-gray-50 flex justify-between">
              <span>X-Ray Report - Priya Sharma</span>
              <span className="text-blue-500 cursor-pointer">View</span>
            </li>
            <li className="p-3 border rounded-lg hover:bg-gray-50 flex justify-between">
              <span>MRI Scan - Arun Kumar</span>
              <span className="text-blue-500 cursor-pointer">View</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
