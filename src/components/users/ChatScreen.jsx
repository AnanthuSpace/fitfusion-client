import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatTrainerList from "./ChatTrainerList";
import io from "socket.io-client";
import { localhostURL } from "../../utils/url";
import { fetchAlreadyChattedTrainer } from "../../redux/users/userThunk";

const socket = io(localhostURL);

const ChatScreen = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const userData = useSelector((state) => state.user.userData);
  const alreadyChattedTrainer = useSelector(
    (state) => state.user.alreadyChattedTrainer
  );

  useEffect(() => {
    if (selectedId !== "") {
      try {
        socket.emit("joinRoom", {
          userId: userData.userId,
          trainerId: selectedId,
        });
      } catch (error) {
        console.log("Error : ", error);
      }
    }
  }, [selectedId]);

  useEffect(() => {
    dispatch(fetchAlreadyChattedTrainer(userData.alreadychattedTrainers));
  }, [dispatch, userData.alreadychattedTrainers]);

  const handleSelectTrainer = (trainerId, trainerName) => {
    setSelectedId(trainerId);
    setSelectedName(trainerName);
  };

  useEffect(() => {
    socket.on("receiveMessage", (messageDetails) => {
      setChatHistory((prevChatHistory) => [...prevChatHistory, { details: messageDetails }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [setChatMessages]);

  const handleSendMessage = () => {    
    console.log(selectedId);
    
    if (messageInput.trim()) {
      const message = {
        senderId: userData.userId,
        recieverId: selectedId,
        text: messageInput,
      };

      const firstTimeChat = chatHistory.length === 0;
      socket.emit("sendMessage", { message, firstTimeChat });
      setChatMessages((prevMessages) => [message, ...prevMessages]);
      setMessageInput("");
    }
  };

  return (
    <div className="d-flex flex-grow-1 overflow-hidden background-gradient-main">
      <ChatTrainerList
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSelectTrainer={handleSelectTrainer}
        setChatHistory={setChatHistory}
        alreadyChattedTrainer={alreadyChattedTrainer}
      />
      <div className="col-9 p-3 d-flex flex-column">
        {selectedName && (
          <h4 className="chat-header glass-effect">{selectedName}</h4>
        )}
        <div className="flex-grow-1 d-flex flex-column-reverse overflow-auto mb-3">
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
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input d-flex">
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
      </div>
    </div>
  );
};

export default ChatScreen;
