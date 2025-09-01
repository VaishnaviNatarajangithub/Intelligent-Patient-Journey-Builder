// src/pages/Dashboard/Analytics.jsx
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [selectedPatient, setSelectedPatient] = useState("All Patients");
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const patients = ["All Patients", "John Doe", "Jane Smith", "Mike Johnson"];

  const healthScoreData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Health Score (%)",
        data: [80, 82, 85, 88],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const labTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Cholesterol (mg/dL)",
        data: [190, 200, 195, 185, 180],
        backgroundColor: "rgba(234, 179, 8, 0.6)",
      },
      {
        label: "Blood Sugar (mg/dL)",
        data: [110, 105, 120, 115, 108],
        backgroundColor: "rgba(220, 38, 38, 0.6)",
      },
    ],
  };

  const riskDistributionData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Risk Distribution",
        data: [3, 5, 12],
        backgroundColor: [
          "rgba(220, 38, 38, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(34, 197, 94, 0.6)",
        ],
      },
    ],
  };

  // Additional metrics
  const averageHealthScore = 85;
  const patientsAtRisk = 5;
  const labCompletionRate = "90%";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Analytics</h1>
          <p className="text-gray-600">Insights & trends for patient health monitoring</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            {patients.map((patient, index) => (
              <option key={index} value={patient}>
                {patient}
              </option>
            ))}
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 90 Days">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-gray-500 text-sm">Next 7 Days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Risk Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2</p>
            <p className="text-gray-500 text-sm">Critical Patients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{averageHealthScore}%</p>
            <p className="text-gray-500 text-sm">Overall Wellness</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lab Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{labCompletionRate}</p>
            <p className="text-gray-500 text-sm">This Month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Health Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={healthScoreData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lab Results Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={labTrendData} />
          </CardContent>
        </Card>

        <Card className="md:col-span-1 max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Doughnut data={riskDistributionData} options={{ maintainAspectRatio: false, responsive: true }} height={250} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
