import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
      {messages.map((msg, index) => (
        <div key={index} style={{ margin: "5px 0" }}>
          <b>{msg.user ? "You: " : "Bot: "}</b>{msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
