import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { MdOutlineVideocam } from "react-icons/md";
import TrainerVideoCreen from "./TrainerVideoCreen";

const TrainerChatScreen = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  currentCustomerName,
  chatHistory,
  receiverId,
  currentCustomerId,
  socket,
  directChatId,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const trainerId = useSelector((state) => state.trainer.trainerData.trainerId);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleVideoCallClick = () => {
    setShowVideoCall(true);
  };

  const handleCloseVideoCall = () => {
    setShowVideoCall(false);
  };

  useEffect(() => {
    if (socket && trainerId) {
      socket.emit("enterTheChatPage", { user: trainerId });

      socket.on("userIsOnline", ({ user_id }) => {
        if (user_id === currentCustomerId) {
          setOnlineStatus(true);
        }
      });

      socket.on("userIsOffline", ({ user_id }) => {
        if (user_id === currentCustomerId) {
          setOnlineStatus(false);
        }
      });

      return () => {
        socket.emit("leaveTheChatPage", { user: trainerId });
        socket.off("userIsOnline");
        socket.off("userIsOffline");
      };
    }
  }, [socket, trainerId, currentCustomerId, directChatId]);

  return (
    <div className="col-9 p-3 chat-window d-flex flex-column">
      {showVideoCall && (
        <TrainerVideoCreen
          onClose={handleCloseVideoCall}
          receiverId={receiverId}
          currentCustomerId={currentCustomerId}
          receiverName={currentCustomerName}
        />
      )}
      {currentCustomerName ? (
        <>
          <div className="d-flex justify-content-between align-items-center chat-header glass-effect">
            <div>
              <h4 className="m-0">{currentCustomerName}</h4>
              <div className="d-flex align-items-center">
                <span
                  className="status-dot"
                  style={{
                    backgroundColor: onlineStatus ? "green" : "red",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                ></span>
                {onlineStatus ? "online" : "offline"}
              </div>
            </div>
            <MdOutlineVideocam
              style={{ cursor: "pointer", fontSize: "2rem" }}
              onClick={handleVideoCallClick}
            />
          </div>
          <div className="chat-messages flex-grow-1 d-flex flex-column-reverse overflow-auto mb-3">
            {console.log(chatHistory)}
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.receiverId === trainerId
                    ? "received-message"
                    : "sent-message"
                } d-flex justify-content-${
                  message.receiverId === trainerId ? "start" : "end"
                }`}
              >
                <div className={`message-bubble text-white`}>
                  <div>{message.messages}</div>
                  <small
                    className="message-time"
                    style={{
                      color: "white",
                      display: "block",
                      marginTop: "5px",
                    }}
                  >
                    {new Date(message.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input d-flex align-items-center">
            <button
              className="btn emoji-button me-2"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="emoji-picker">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
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
            Please select a trainer to start interacting and get personalized
            fitness guidance.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrainerChatScreen;
