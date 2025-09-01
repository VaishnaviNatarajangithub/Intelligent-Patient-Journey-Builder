import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";

const SmartAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hello 👋 I’m your Smart Health Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // Simulate sending and getting response (replace with backend API later)
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        sender: "assistant",
        text: "I’ve received your query. Our AI engine will analyze it and provide recommendations soon.",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl w-full max-w-3xl h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center gap-2">
          <FaRobot className="text-2xl" />
          <h2 className="text-lg font-semibold">Smart Health Assistant</h2>
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "assistant" && (
                <FaRobot className="text-blue-600 mt-1" />
              )}
              <div
                className={`px-4 py-2 rounded-2xl shadow ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && <FaUser className="text-gray-500 mt-1" />}
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your query..."
            className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
          >
            <FaPaperPlane />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SmartAssistant;
