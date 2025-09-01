import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient"); // ✅ Added missing role state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Submitted:", { email, password, role });

    try {
      // 🔹 Send login API request (only email and password)
      const res = await axios.post("https://intelligent-patient-journey-builder-6.onrender.com/api/users/login", {
        email,
        password,
      });

      if (res.data.success) {
        const userData = res.data.data; // { id or _id, name, email, role }
        const token = res.data.token;

        // Save to localStorage
        localStorage.setItem("userId", userData.id || userData._id);
        localStorage.setItem("userName", userData.name);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("token", token);

        // Redirect by role
        switch (userData.role) {
          case "patient":
            navigate("/PatientDashboard");
            break;
          case "doctor":
            navigate("/DoctorDashboard");
            break;
          default:
            navigate("/");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login to Patient Journey Builder
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
