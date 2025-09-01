// src/pages/dashboard/PatientDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

import { 
  Calendar, FileText, Activity, Bell, 
  AlertCircle, UploadCloud, Clipboard 
} from "lucide-react";

// Sidebar items
const patientSidebarItems = [
  { label: "Journey Report", href: "/patient/journey-report", icon: <FileText size={20} /> },
  { label: "Risk Alerts", href: "/patient/risk-alerts", icon: <AlertCircle size={20} /> },
  { label: "Report Form", href: "/patient/report-form", icon: <Clipboard size={20} /> },
  { label: "Upload Data", href: "/patient/upload-data", icon: <UploadCloud size={20} /> },
];

const PatientDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    age: "",
    gender: "",
    medicalHistory: "",
    allergies: "",
    contactNumber: "",
  });

  const [stats, setStats] = useState({
    appointments: 0,
    reports: 0,
    healthScore: 0,
    notifications: 0,
  });

  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("patientId") || "12345"; // fallback
        if (!userId) return console.error("No patientId found in localStorage");

        // Profile
        const profileRes = await axios.get(`https://intelligent-patient-journey-builder-6.onrender.com/api/users/patients/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        setProfile(profileRes.data);
        setForm({
          age: profileRes.data.age || "",
          gender: profileRes.data.gender || "",
          medicalHistory: Array.isArray(profileRes.data.medicalHistory) ? profileRes.data.medicalHistory.join(", ") : "",
          allergies: Array.isArray(profileRes.data.allergies) ? profileRes.data.allergies.join(", ") : "",
          contactNumber: profileRes.data.contactNumber || "",
        });

        // Stats
        const statsRes = await axios.get(`http://localhost:4000/api/dashboard/patients/${userId}/stats`, { headers: { Authorization: `Bearer ${token}` } });
        setStats(statsRes.data);

        // Appointments
        const apptRes = await axios.get(`https://intelligent-patient-journey-builder-6.onrender.com/api/patients/${userId}/appointments`, { headers: { Authorization: `Bearer ${token}` } });
        setAppointments(apptRes.data);

        // Reports
        const reportsRes = await axios.get(`https://intelligent-patient-journey-builder-6.onrender.com/api/patients/${userId}/reports`, { headers: { Authorization: `Bearer ${token}` } });
        setReports(reportsRes.data);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  // Handle profile form change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Update profile
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("patientId");
      if (!userId) return alert("User not logged in");

      await axios.put(`https://intelligent-patient-journey-builder-6.onrender.com/api/users/patients/${userId}`, {
        ...form,
        medicalHistory: form.medicalHistory ? form.medicalHistory.split(",").map(s => s.trim()) : [],
        allergies: form.allergies ? form.allergies.split(",").map(s => s.trim()) : [],
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // Chatbot send message
  const handleSendMessage = async (msg) => {
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { from: "user", text: msg }]);
    setInput("");

    try {
      const res = await axios.post("https://intelligent-patient-journey-builder-6.onrender.com/api/chatbot", { message: msg });
      setMessages(prev => [...prev, { from: "bot", text: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { from: "bot", text: "Server error. Please try again." }]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Patient Dashboard</h2>
        <nav className="flex flex-col gap-4">
          {patientSidebarItems.map(item => (
            <a key={item.label} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 transition">
              {item.icon} <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {profile?.name || "Patient"} 👋</h1>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Appointments</CardTitle>
              <Calendar className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.appointments}</p>
              <p className="text-sm text-gray-500">Upcoming</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Reports</CardTitle>
              <FileText className="h-6 w-6 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.reports}</p>
              <p className="text-sm text-gray-500">Recent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Health Score</CardTitle>
              <Activity className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.healthScore}%</p>
              <p className="text-sm text-gray-500">Overall Wellness</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              <Bell className="h-6 w-6 text-purple-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.notifications}</p>
              <p className="text-sm text-gray-500">Unread</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          {profile ? (
            <div className="space-y-3">
              <input className="w-full border p-2 rounded" name="age" value={form.age} onChange={handleChange} placeholder="Age" />
              <select className="w-full border p-2 rounded" name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input className="w-full border p-2 rounded" name="medicalHistory" value={form.medicalHistory} onChange={handleChange} placeholder="Medical History (comma separated)" />
              <input className="w-full border p-2 rounded" name="allergies" value={form.allergies} onChange={handleChange} placeholder="Allergies (comma separated)" />
              <input className="w-full border p-2 rounded" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact Number" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={handleUpdate}>Update Profile</button>
            </div>
          ) : <p>Loading profile...</p>}
        </div>

        {/* Chatbot */}
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">AI Assistant</h2>
          <div className="bg-gray-100 rounded-xl p-4 h-80 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] p-3 rounded-xl ${msg.from === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="mt-4 flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" onKeyDown={e => e.key === "Enter" && handleSendMessage(input)} />
            <button onClick={() => handleSendMessage(input)} className="bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition-colors">Send</button>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {appointments.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3">{appt.doctorName}</td>
                    <td className="p-3">{new Date(appt.date).toLocaleDateString()}</td>
                    <td className="p-3">{appt.time}</td>
                    <td className="p-3 text-green-600">{appt.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p>No appointments found</p>}
        </div>

        {/* Lab Reports */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Lab Reports</h2>
          {reports.length > 0 ? (
            <ul className="space-y-2">
              {reports.map((r, i) => (
                <li key={i} className="flex justify-between border-b pb-2">
                  <span>{r.type}</span>
                  <span className="text-gray-500">{r.result}</span>
                </li>
              ))}
            </ul>
          ) : <p>No lab reports available</p>}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
