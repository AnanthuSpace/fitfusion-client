import React, { useState } from "react";
import "../../assets/styles/trainers/TrainerChat.css";

function TrainerChat() {
  const [searchTerm, setSearchTerm] = useState("");
  const users = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis"];
  const messages = [
    { sender: "John Doe", text: "Hey, how's the training going?" },
    { sender: "You", text: "Great! Just finished a session." },
    { sender: "John Doe", text: "Nice! Keep up the good work." },
  ];


  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex flex-grow-1 overflow-hidden">
      <div className="col-3 p-3 user-list">
        <input
          type="text"
          className="form-control mb-3 chat-txt"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="list-group">
          {filteredUsers.map((user, index) => (
            <li key={index} className="list-group-item user-item">
              {user}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-9 p-3 chat-window d-flex flex-column">
        <div className="chat-messages flex-grow-1 d-flex flex-column-reverse overflow-auto mb-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === "You" ? "sent-message" : "received-message"
              }`}
            >
              <strong>{message.sender}: </strong>
              {message.text}
            </div>
          ))}
        </div>

        <div className="chat-input d-flex">
          <input
            type="text"
            className="form-control me-2 chat-txt"
            placeholder="Type a message..."
          />
          <button className="btn">Send</button>
        </div>
      </div>
    </div>
  );
}

export default TrainerChat;
