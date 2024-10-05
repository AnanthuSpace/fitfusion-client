import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatTrainerList from "./ChatTrainerList";
import { localhostURL } from "../../utils/url";
import io from "socket.io-client";
import { MdOutlineVideocam } from "react-icons/md";
import { fetchAlreadyChattedTrainer } from "../../redux/users/userThunk";
import EmojiPicker from "emoji-picker-react";
import VideoCallScreen from "../common/VideoCallScreen";
import { useLocation } from "react-router-dom";

const socket = io(localhostURL);

const ChatScreen = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [directChatId, setDirectChatId] = useState("");
  const [directChatName, setDirectChatName] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const location = useLocation();

  const userData = useSelector((state) => state.user.userData);
  const alreadyChattedTrainer = useSelector(
    (state) => state.user.alreadyChattedTrainer
  );

  const handleSelectTrainer = (trainerId, trainerName) => {
    setSelectedId(trainerId);
    setSelectedName(trainerName);

    socket.emit("enterTheChatPage", { user: userData.userId });
    socket.emit("joinRoom", {
      sender: userData.userId,
      reciver: trainerId,
    });
  };

  useEffect(() => {
    if (userData.alreadychattedTrainers) {
      dispatch(fetchAlreadyChattedTrainer(userData.alreadychattedTrainers));
    }
  }, [dispatch, userData.alreadychattedTrainers]);

  useEffect(() => {
    socket.on("receiveMessage", (messageDetails) => {
      setChatHistory((prevChatHistory) => [
        { ...messageDetails },
        ...prevChatHistory,
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    socket.on("userIsOnline", ({ user_id }) => {
      console.log("User online: ", user_id);
      if (user_id === selectedId) {
        setOnlineStatus(true);
      }
    });

    socket.on("userIsOffline", ({ user_id }) => {
      console.log("User offline: ", user_id);
      if (user_id === selectedId) {
        setOnlineStatus(false);
      }
    });

    return () => {
      socket.off("userIsOnline");
      socket.off("userIsOffline");
    };
  }, [selectedId]);

  useEffect(() => {
    return () => {
      socket.emit("leaveTheChatPage", { user: userData.userId });
    };
  }, [userData.userId]);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedId) {
      const message = {
        senderId: userData.userId,
        recieverId: selectedId,
        text: messageInput,
      };

      console.log(directChatId);

      const firstTimeChat = directChatId !== "";
      socket.emit("sendMessage", { message, firstTimeChat });
      setMessageInput("");
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessageInput(messageInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleVideoCallClick = () => {
    setShowVideoCall(true);
  };

  const handleCloseVideoCall = () => {
    setShowVideoCall(false);
  };

  useEffect(() => {
    if (location.state) {
      setDirectChatId(location.state.trainerId || "");
      setDirectChatName(location.state.trainerName || "");
    } else {
      setDirectChatId("");
      setDirectChatName("");
    }
  }, [location.state]);

  return (
    <div className="d-flex flex-grow-1 overflow-hidden background-gradient-main">
      <ChatTrainerList
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSelectTrainer={handleSelectTrainer}
        setChatHistory={setChatHistory}
        alreadyChattedTrainer={alreadyChattedTrainer}
        directChatId={directChatId}
        directChatName={directChatName}
      />
      <div className="col-9 p-3 d-flex flex-column">
        {showVideoCall && (
          <VideoCallScreen
            onClose={handleCloseVideoCall}
            receiverId={selectedId}
            senderId={userData.userId}
          />
        )}
        {selectedName ? (
          <>
            <div className="d-flex justify-content-between align-items-center chat-header glass-effect">
              <div>
                <h4 className="m-0">{selectedName}</h4>
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
            <div className="user-chat-messages flex-grow-1 d-flex flex-column-reverse overflow-auto mb-3">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.senderId === userData.userId
                      ? "user-chat-message"
                      : "received-message"
                  } d-flex justify-content-${
                    message.senderId === userData.userId ? "end" : "start"
                  }`}
                >
                  <div className="message-bubble text-white">
                    {message.messages}
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

            <div className="chat-input d-flex">
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
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && messageInput.trim() !== "") {
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="gradient-button-global"
                onClick={handleSendMessage}
                disabled={messageInput.trim() === ""}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="welcome-message text-white text-center mt-5">
            <h3 className="mb-3">Welcome to the Chat!</h3>
            <p className="lead text-white">
              Please select a customer to start interacting and get personalized
              fitness guidance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatScreen;
