import React from "react";
import { useSelector } from "react-redux";

const TrainerChatScreen = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  currentCustomerName,
  chatHistory,
}) => {
  const trainerId = useSelector((state) => state.trainer.trainerData.trainerId);
  return (
    <div className="col-9 p-3 chat-window d-flex flex-column">
  {currentCustomerName ? (
    <>
      <h4 className="chat-header glass-effect">{currentCustomerName}</h4>
      <div className="chat-messages flex-grow-1 d-flex flex-column-reverse overflow-auto mb-3">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.receiverId === trainerId
                ? "received-message"
                : "sent-message"
            } d-flex justify-content-${
              message.receiverId === trainerId ? "end" : "start"
            }`}
          >
            <div
              className={`message-bubble ${
                message.senderID === trainerId ? "text-white" : "text-white"
              }`}
            >
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim() !== "") {
              handleSendMessage();
            }
          }}
          aria-label="Chat message input"
        />
        <button
          className="btn gradient-button-global"
          onClick={handleSendMessage}
          disabled={newMessage.trim() === ""}
        >
          Send
        </button>
      </div>
    </>
  ) : (
    <div className="welcome-message text-center mt-5">
      <h3 className="mb-3">Welcome to the Chat!</h3>
      <p className="lead">
        Please select a trainer to start interacting and get personalized fitness guidance.
      </p>
    </div>
  )}
</div>
  );
};

export default TrainerChatScreen;
