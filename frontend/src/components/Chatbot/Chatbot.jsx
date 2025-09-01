import React, { useState } from "react";
import ChatInput from "./ChatInput";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (msg) => {
    setMessages((prev) => [...prev, { from: "user", text: msg }]);

    try {
      const res = await fetch("http://localhost:4000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", text: "Server error" }]);
    }
  };

  return (
    <div style={{ width: "400px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Patient Journey Chatbot</h2>

      <div style={{ height: "300px", overflowY: "auto", padding: "10px", borderRadius: "5px", backgroundColor: "#f9f9f9", marginBottom: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === "user" ? "right" : "left", margin: "5px 0" }}>
            <span style={{ display: "inline-block", padding: "8px 12px", borderRadius: "15px", backgroundColor: msg.from === "user" ? "#007bff" : "#e0e0e0", color: msg.from === "user" ? "#fff" : "#000" }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
