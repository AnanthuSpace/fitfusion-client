import React from "react";
import { useSelector } from "react-redux";

const TrainerChatScreen = ({ messages ,newMessage,setNewMessage,handleSendMessage,currentCustomerName, currentCustomerId, chatHistory }) => {
    const trainerId = useSelector((state)=>state.trainer.trainerData.trainerId)
  return (
    <div className="col-9 p-3 chat-window d-flex flex-column">
      {currentCustomerName && (
        <h4 className="chat-header glass-effect">{currentCustomerName}</h4>
      )}
      <div className="chat-messages flex-grow-1 d-flex flex-column-reverse overflow-auto mb-3">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.senderID === trainerId ? "received-message" : "sent-message"
            } d-flex justify-content-${
              message.senderID === trainerId ? "end" : "start"
            }`}
          >
            <div className={`message-bubble ${message.senderID === trainerId ? " text-white" : " text-white"}`}>
              {message.messages}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input d-flex">
        <input
          type="text"
          className="form-control me-2 chat-txt"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default TrainerChatScreen;
