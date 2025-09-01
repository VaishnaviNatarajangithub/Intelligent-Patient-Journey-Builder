import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUserMd, FaRobot, FaShieldAlt, FaHospital, FaComments, FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa"; // for mobile toggle
import SmartAssistant from "../components/SmartAssistant"; // adjust the path if needed

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false); // toggle for SmartAssistant

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-700">Patient Journey AI</h1>
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="login" className="hover:text-blue-600">Login</a>
          </nav>
          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4 text-gray-700 font-medium">
            <a href="#" className="block hover:text-blue-600">Home</a>
            <a href="#about" className="block hover:text-blue-600">About</a>
            <a href="#services" className="block hover:text-blue-600">Services</a>
            <a href="#features" className="block hover:text-blue-600">Features</a>
            <a href="#login" className="block hover:text-blue-600">Login</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white py-24 px-8 text-center mt-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6"
        >
          Intelligent Patient Journey Builder
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg max-w-2xl mx-auto mb-8"
        >
          Empowering healthcare providers with AI-powered tools to design,
          personalize, and optimize patient journeys across the entire care
          lifecycle.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Get Started
        </motion.button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaHeartbeat className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
            <p>AI-driven customization of patient journeys for better health outcomes.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaUserMd className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Provider Friendly</h3>
            <p>Easy-to-use platform for doctors, nurses, and care managers.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaRobot className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Automation</h3>
            <p>Streamline workflows with intelligent automation and analytics.</p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="services" className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-lg shadow-md bg-gray-50">
            <FaHospital className="text-3xl text-indigo-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Step 1</h4>
            <p>Onboard patients & gather initial health data.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-gray-50">
            <FaRobot className="text-3xl text-purple-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Step 2</h4>
            <p>AI analyzes needs & recommends tailored journeys.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-gray-50">
            <FaUserMd className="text-3xl text-teal-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Step 3</h4>
            <p>Clinicians review, adjust, and monitor progress.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-gray-50">
            <FaShieldAlt className="text-3xl text-red-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Step 4</h4>
            <p>Continuous improvement through secure data insights.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">
          Trusted by Healthcare Leaders
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="italic mb-4">
              “The Patient Journey Builder has transformed how we manage chronic
              patients. Our efficiency and patient satisfaction improved
              dramatically.”
            </p>
            <h4 className="font-semibold text-blue-600">Dr. A. Sharma</h4>
            <p className="text-gray-500">Chief Medical Officer</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="italic mb-4">
              “Seamless integration with our existing systems and AI-powered
              automation has saved us countless hours.”
            </p>
            <h4 className="font-semibold text-blue-600">R. Iyer</h4>
            <p className="text-gray-500">Healthcare Administrator</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-10 px-8 mt-auto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Patient Journey Builder</h3>
            <p>
              AI-powered healthcare platform enabling smarter patient engagement,
              care management, and clinical outcomes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#services" className="hover:underline">Workflow</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div id="contact">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>Email: support@patientjourney.ai</p>
            <p>Phone: +91 98765 43210</p>
            <p>© {new Date().getFullYear()} Patient Journey AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating SmartAssistant */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {assistantOpen && (
          <div className="w-80 h-96 bg-white shadow-xl rounded-xl overflow-hidden">
            <SmartAssistant />
          </div>
        )}
        <button
          onClick={() => setAssistantOpen(!assistantOpen)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        >
          {assistantOpen ? <FaTimes /> : <FaComments />}
        </button>
      </div>
    </div>
  );
};

export default Home;
