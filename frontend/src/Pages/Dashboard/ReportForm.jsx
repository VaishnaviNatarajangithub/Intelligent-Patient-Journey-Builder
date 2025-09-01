// src/pages/ReportForm.jsx
import { useState } from "react";
import axios from "axios";

export default function ReportForm() {
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    diagnosis: "",
    prescriptions: [],
    labResults: [],
    notes: ""
  });

  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value.split(",").map(item => item.trim()) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReport(null);

    try {
      const response = await axios.post("http://localhost:5000/api/reports/create", formData);
      setReport(response.data.report);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to generate report.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Medical Report</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="patient"
          placeholder="Patient ID"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="doctor"
          placeholder="Doctor ID"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="prescriptions"
          placeholder="Prescriptions (comma separated)"
          onChange={(e) => handleArrayChange(e, "prescriptions")}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="labResults"
          placeholder="Lab Results (comma separated)"
          onChange={(e) => handleArrayChange(e, "labResults")}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate Report
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {report && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">AI-Generated Insights</h3>
          <p>{report.aiInsights}</p>
        </div>
      )}
    </div>
  );
}
