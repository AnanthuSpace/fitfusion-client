import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userAxiosInstance from "../../config/axiosConfig";
import ChatTrainerList from "./ChatTrainerList";
import io from "socket.io-client";
import { localhostURL } from "../../utils/url";

const ChatScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);

  const trainersData = useSelector((state) => state.user.trainersData);
  const userData = useSelector((state) => state.user.userData);
  const subscriptionList = useSelector((state) => state.user.userData.subscribeList);

  const subscribedTrainers = trainersData.filter((trainer) =>
    subscriptionList.includes(trainer.trainerId)
  );

  const subscribedTrainerNames = subscribedTrainers.map((trainer) => ({
    name: trainer.name,
    trainerId: trainer.trainerId,
  }));

  const filteredTrainers = subscribedTrainerNames.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const socket = io(localhostURL);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chatMessage", (msg) => {
        setChatMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [socket]);

  const handleTrainerClick = async (trainerId) => {
    setSelectedTrainerId(trainerId);
    try {
      const response = await userAxiosInstance.post(
        `${localhostURL}/chat/fetchChat`,
        { senderId: userData.userId, receiverId: trainerId }
      );
      setChatMessages(response.data);
      socket.emit("joinRoom", { userId: userData.userId, trainerId });
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedTrainerId) {
      const room = `${userData.userId}-${selectedTrainerId}`;
      socket.emit("chatMessage", {
        senderId: userData.userId,
        receiverId: selectedTrainerId,
        message: messageInput,
        room
      });
      setMessageInput("");
    }
  };

  return (
    <div className="d-flex flex-grow-1 overflow-hidden">
      <ChatTrainerList
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredTrainers={filteredTrainers}
        handleTrainerClick={handleTrainerClick}
      />
      <div className="col-9 p-3 d-flex flex-column">
        <div className="flex-grow-1 d-flex flex-column-reverse overflow-auto mb-3">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.senderId === userData.userId
                  ? "user-chat-message"
                  : "received-message"
              }`}
            >
              <strong>{message.senderId}: </strong>
              {message.message}
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
          />
          <button className="gradient-button-global" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
