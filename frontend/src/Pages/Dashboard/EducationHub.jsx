// src/pages/EducationHub.jsx
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, HelpCircle, Brain } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Understanding Your Condition",
    description: "Interactive guides and articles that simplify complex medical terms.",
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
  },
  {
    id: 2,
    title: "Video Tutorials",
    description: "Step-by-step videos on self-care routines and healthy practices.",
    icon: <Video className="w-8 h-8 text-green-600" />,
  },
  {
    id: 3,
    title: "FAQs",
    description: "Quick answers to the most common questions patients have.",
    icon: <HelpCircle className="w-8 h-8 text-yellow-600" />,
  },
  {
    id: 4,
    title: "AI Health Insights",
    description: "Personalized learning recommendations powered by AI.",
    icon: <Brain className="w-8 h-8 text-purple-600" />,
  },
];

const EducationHub = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Hero Section */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Education Hub
        </h1>
        <p className="text-lg text-gray-600">
          Empower yourself with the right knowledge. Explore guides, tutorials,
          FAQs, and AI-powered insights tailored for you.
        </p>
      </motion.div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="mb-4">{resource.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {resource.title}
            </h3>
            <p className="text-gray-600 text-sm">{resource.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all">
          Explore More Resources
        </button>
      </motion.div>
    </div>
  );
};

export default EducationHub;
