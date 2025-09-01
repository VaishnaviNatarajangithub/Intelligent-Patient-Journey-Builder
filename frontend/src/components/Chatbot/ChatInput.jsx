import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ flex: 1, padding: "5px" }}
      />
      <button onClick={handleSend} style={{ marginLeft: "5px" }}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;

