// src/pages/Dashboard/PatientJourneyReport.jsx
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { jsPDF } from "jspdf";
import { Download, RefreshCw } from "lucide-react";
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
  Legend
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

const PatientJourneyReport = () => {
  // Hardcoded patientId for testing
  const patientId = "68b15fcda937e13041f844e2";

  const reportRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryMode, setSummaryMode] = useState("doctor");
  const [regenerating, setRegenerating] = useState(false);

  // Fetch patient journey data
  useEffect(() => {
    let mounted = true;
    const fetchJourney = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/patients/${patientId}/journey`);
        if (mounted) setData(res.data);
      } catch (err) {
        console.error("Error fetching journey:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchJourney();
    return () => { mounted = false; };
  }, []);

  // Regenerate AI summary using HuggingFace
  const handleRegenerate = async () => {
    if (!data) return;
    try {
      setRegenerating(true);

      const reportsText = (data.reports || [])
        .map(r => `Diagnosis: ${r.diagnosis}. Prescriptions: ${r.prescriptions?.join(", ") || "None"}. Notes: ${r.notes || "None"}.`)
        .join("\n");

      const stepsText = (data.steps || [])
        .map((s, i) => `${i + 1}. ${s.stepName} - ${s.status} (${s.description || "No description"})`)
        .join("\n");

      const fullText = `Patient Journey Summary:\n${reportsText}\nJourney Steps:\n${stepsText}`;

      const HF_API = "https://api-inference.huggingface.co/models/google/flan-t5-large";
      const HF_KEY = "YOUR_HF_API_KEY"; // Replace with your HuggingFace API key

      const response = await axios.post(
        HF_API,
        { inputs: fullText },
        { headers: { Authorization: `Bearer ${HF_KEY}` } }
      );

      let aiSummary = "";
      if (response.data?.[0]?.generated_text) aiSummary = response.data[0].generated_text;
      else if (typeof response.data === "string") aiSummary = response.data;
      else aiSummary = "Failed to generate AI summary.";

      const doctorSummary = aiSummary;
      const patientSummary = aiSummary;

      setData(prev => ({
        ...prev,
        summary: {
          doctorSummary,
          patientSummary,
          updatedAt: new Date().toISOString()
        }
      }));
    } catch (err) {
      console.error("Error generating AI summary:", err);
      alert("Failed to generate AI summary.");
    } finally {
      setRegenerating(false);
    }
  };

  // Download PDF with all details
  const handleDownloadPDF = () => {
    if (!data) return;
    const { reports, steps, summary } = data;
    const latestReport = reports[0] || {};

    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 10;
    let y = margin;

    pdf.setFontSize(16);
    pdf.text("Patient Journey Report", margin, y);
    y += 10;

    pdf.setFontSize(12);
    pdf.text(`Patient ID: ${patientId}`, margin, y);
    y += 6;
    pdf.text(`DOB: ${latestReport.dob || "N/A"} | Gender: ${latestReport.gender || "N/A"}`, margin, y);
    y += 8;

    pdf.setFontSize(14);
    pdf.text(`AI Summary (${summaryMode} view):`, margin, y);
    y += 6;
    const summaryText = summaryMode === "doctor"
      ? summary?.doctorSummary || latestReport.aiInsights || "No AI summary available."
      : summary?.patientSummary || latestReport.aiInsights || "No AI summary available.";
    pdf.setFontSize(12);
    pdf.splitTextToSize(summaryText, 180).forEach(line => { y += 6; pdf.text(line, margin, y); });
    y += 6;

    pdf.setFontSize(14);
    pdf.text("Journey Steps:", margin, y);
    y += 6;
    (steps || []).forEach((step, idx) => {
      const stepText = `${idx + 1}. ${step.stepName} - ${step.status} (${step.description || "No description"})`;
      pdf.splitTextToSize(stepText, 180).forEach(line => { y += 6; pdf.text(line, margin, y); });
    });
    y += 6;

    pdf.setFontSize(14);
    pdf.text("Reports:", margin, y);
    y += 6;
    (reports || []).forEach((r, idx) => {
      const reportText = `Report ${idx + 1}:
Diagnosis: ${r.diagnosis || "N/A"}
Prescriptions: ${r.prescriptions?.join(", ") || "None"}
Lab Results: ${r.labResults?.join(", ") || "None"}
Doctor Notes: ${r.notes || "None"}
AI Insights: ${r.aiInsights || "No AI summary available."}`;
      pdf.setFontSize(12);
      pdf.splitTextToSize(reportText, 180).forEach(line => { y += 6; pdf.text(line, margin, y); });
      y += 4;
    });

    pdf.save("Patient_Journey_Report.pdf");
  };

  if (loading) return <p className="p-6">Loading report...</p>;
  if (!data) return <p className="p-6">No journey data available.</p>;

  const { reports, steps, summary } = data;
  const doctorText = summary?.doctorSummary || (reports[0]?.aiInsights) || "No AI summary available.";
  const patientText = summary?.patientSummary || (reports[0]?.aiInsights) || "No AI summary available.";
  const lastUpdated = summary?.updatedAt ? new Date(summary.updatedAt).toLocaleString() : "N/A";

  // Charts data (sample)
  const healthScoreData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{
      label: "Health Score (%)",
      data: [80, 82, 85, 88],
      borderColor: "rgba(59,130,246,1)",
      backgroundColor: "rgba(59,130,246,0.2)",
      tension: 0.4
    }]
  };
  const labTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      { label: "Cholesterol", data: [190, 200, 195, 185, 180], backgroundColor: "rgba(234,179,8,0.6)" },
      { label: "Blood Sugar", data: [110, 105, 120, 115, 108], backgroundColor: "rgba(220,38,38,0.6)" }
    ]
  };
  const riskDistributionData = {
    labels: ["High", "Medium", "Low"],
    datasets: [{ data: [3, 5, 12], backgroundColor: ["rgba(220,38,38,0.6)","rgba(234,179,8,0.6)","rgba(34,197,94,0.6)"] }]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-end mb-6 gap-3">
        <button onClick={handleRegenerate} disabled={regenerating} className="flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded">
          <RefreshCw className="w-4 h-4" /> {regenerating ? "Generating AI summary..." : "Regenerate Summary"}
        </button>
        <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg">
          <Download className="w-5 h-5" /> Download PDF
        </button>
      </div>

      <div ref={reportRef} className="bg-white p-6 rounded-xl shadow space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{reports[0]?.patientName || "Patient Name"}</h1>
            <p className="text-gray-500">Patient ID: {patientId}</p>
            <p className="text-gray-500">DOB: {reports[0]?.dob || "N/A"} | Gender: {reports[0]?.gender || "N/A"}</p>
          </div>
          <p className="text-gray-600 italic">AI summary last updated: {lastUpdated}</p>
        </div>

        <Card className="bg-gray-50">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>AI-Powered Patient Summary</CardTitle>
            <div className="flex items-center gap-2">
              <button onClick={() => setSummaryMode("doctor")} className={`px-3 py-1 rounded ${summaryMode === "doctor" ? "bg-blue-600 text-white" : "bg-white"}`}>Doctor</button>
              <button onClick={() => setSummaryMode("patient")} className={`px-3 py-1 rounded ${summaryMode === "patient" ? "bg-blue-600 text-white" : "bg-white"}`}>Patient</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto p-3 bg-gray-100 rounded border">
              <p className="text-gray-700 whitespace-pre-line">{summaryMode === "doctor" ? doctorText : patientText}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Journey Steps</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(steps || []).map(step => (
                <li key={step._id} className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${step.status === "completed" ? "bg-green-500" : "bg-yellow-500"}`}></div>
                  <div>
                    <p className="font-medium">{step.stepName} <span className="text-sm text-gray-400">({step.status})</span></p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                    <p className="text-xs text-gray-400">{step.date ? new Date(step.date).toLocaleString() : ""}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card><CardHeader><CardTitle>Health Score Trend</CardTitle></CardHeader><CardContent><Line data={healthScoreData} /></CardContent></Card>
          <Card><CardHeader><CardTitle>Lab Results Trend</CardTitle></CardHeader><CardContent><Bar data={labTrendData} /></CardContent></Card>
          <Card className="md:col-span-2"><CardHeader><CardTitle>Risk Distribution</CardTitle></CardHeader><CardContent className="max-w-md mx-auto"><Doughnut data={riskDistributionData} /></CardContent></Card>
        </div>
      </div>
    </div>
  );
};

export default PatientJourneyReport;
