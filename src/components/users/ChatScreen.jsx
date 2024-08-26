import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ChatScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const trainersData = useSelector((state) => state.user.trainersData);
  const userId = useSelector((state) => state.user.userData.userId);
  const subscriptionList = useSelector((state) => state.user.userData.subscribeList);
  const chatMessage = useSelector((state) => state.user.userData.subscribeList);
  const initialChatMessage = useSelector((state) => state.user.chatMessage.messages);

  const subscribedTrainers = trainersData.filter(trainer =>
    subscriptionList.includes(trainer.trainerId)
  );
  
  const subscribedTrainerNames = subscribedTrainers.map(trainer => trainer.name);
  

  const filteredTrainers = subscribedTrainerNames.filter((trainer) =>
    trainer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  useEffect(() => {
    if (initialChatMessage) {
      setChatMessages([initialChatMessage]);
    }
  }, [initialChatMessage]);


  useEffect(() => {
    if (selectedTrainerId) {
      
      fetch(`${localhostURL}/chat/start`,{userId :userId, trainerId: selectedTrainerId})
        .then(response => response.json())
        .then(data => setChatMessages(data))
        .catch(error => console.error("Error fetching chat messages:", error));
    }
  }, [selectedTrainerId]);


  const handleTrainerClick = (trainerId) => {
    setSelectedTrainerId(trainerId);
  };

  return (
    <div className="d-flex flex-grow-1 overflow-hidden">
      <div className="col-3 p-3">
        <input
          type="text"
          className="form-control mb-3 chat-txt"
          placeholder="Search trainers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="list-group">
          {filteredTrainers.map((trainer, index) => (
            <li
              key={index}
              className="list-group-item user-item"
              onClick={() => handleTrainerClick(trainer.trainerId)}
            >
              {trainer.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-9 p-3 d-flex flex-column">
        <div className="flex-grow-1 d-flex flex-column-reverse overflow-auto mb-3">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === "You" ? "user-chat-message" : "received-message"
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

