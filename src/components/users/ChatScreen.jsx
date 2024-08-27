import React, { useState } from "react";
import { useSelector } from "react-redux";
import userAxiosInstance from "../../config/axiosConfig";
import ChatTrainerList from "./ChatTrainerList";
import { localhostURL } from "../../utils/url";

function ChatScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  const trainersData = useSelector((state) => state.user.trainersData);
  const userData = useSelector((state) => state.user.userData);
  const subscriptionList = useSelector(
    (state) => state.user.userData.subscribeList
  );

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

  const handleTrainerClick = async (trainerId) => {
    setSelectedTrainerId(trainerId);
    try { 
      const response = await userAxiosInstance.post(
        `${localhostURL}/chat/fetchChat`,
        { senderId: userData.userId, receiverId: trainerId }
      );
      console.log("responds " ,response.data);
      setChatMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
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
                message.sender === "You"
                  ? "user-chat-message"
                  : "received-message"
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
          <button className="gradient-button-global">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
