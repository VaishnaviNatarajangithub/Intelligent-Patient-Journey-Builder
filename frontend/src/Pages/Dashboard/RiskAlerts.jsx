// src/pages/Dashboard/RiskAlerts.jsx
import React, { useState } from "react";
import { AlertCircle, Search } from "lucide-react";

const RiskAlerts = () => {
  const [search, setSearch] = useState("");

  const alerts = [
    { patient: "John Doe", type: "High Blood Pressure", date: "Aug 23, 2025", severity: "High" },
    { patient: "Jane Smith", type: "High Cholesterol", date: "Aug 22, 2025", severity: "Medium" },
    { patient: "Mike Johnson", type: "Low Vitamin D", date: "Aug 21, 2025", severity: "Low" },
    { patient: "Emily Clark", type: "High Sugar Level", date: "Aug 20, 2025", severity: "High" },
  ];

  const severityColor = {
    High: "text-red-600 bg-red-100",
    Medium: "text-yellow-600 bg-yellow-100",
    Low: "text-green-600 bg-green-100",
  };

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.patient.toLowerCase().includes(search.toLowerCase()) ||
      alert.type.toLowerCase().includes(search.toLowerCase()) ||
      alert.severity.toLowerCase().includes(search.toLowerCase())
  );

  const summary = {
    High: alerts.filter((a) => a.severity === "High").length,
    Medium: alerts.filter((a) => a.severity === "Medium").length,
    Low: alerts.filter((a) => a.severity === "Low").length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-800">Risk Alerts</h1>
        </div>
        <p className="text-gray-600">Monitor patient health risks in real-time</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {["High", "Medium", "Low"].map((level) => (
          <div
            key={level}
            className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{level} Severity</h2>
              <p className="text-2xl font-bold">{summary[level]}</p>
            </div>
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center ${severityColor[level]}`}
            >
              {level[0]}
            </div>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by patient, type, or severity..."
          className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="p-3">Patient</th>
              <th className="p-3">Alert Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Severity</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.length ? (
              filteredAlerts.map((alert, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-medium text-gray-700">{alert.patient}</td>
                  <td className="p-3">{alert.type}</td>
                  <td className="p-3">{alert.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${severityColor[alert.severity]}`}
                    >
                      {alert.severity}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No matching alerts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskAlerts;
