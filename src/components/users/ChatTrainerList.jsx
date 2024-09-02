import React from "react";
import userAxiosInstance from "../../config/axiosConfig";
import { useSelector } from "react-redux";
import { localhostURL } from "../../utils/url";

function ChatTrainerList({ searchTerm, setSearchTerm, onSelectTrainer, setChatHistory, alreadyChattedTrainer }) {
const userId = useSelector((state) => state.user.userData.userId)

  const handleTrainerClick = async (trainerId, trainerName) => {
    try {
        const response = await userAxiosInstance.get(`${localhostURL}/chat/fetchChat`, {
            params: {
                trainerId: trainerId,
                userId: userId,
            },
        });
        const sortedChatHistory = response.data.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());        
        setChatHistory(sortedChatHistory);
        onSelectTrainer(trainerId, trainerName);
    } catch (error) {
        console.error("Error fetching chat history:", error);
    }
  };

  const filteredTrainer = alreadyChattedTrainer.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className="col-3 p-3">
      <input
        type="text"
        className="form-control mb-3 chat-txt"
        placeholder="Search trainers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
       {filteredTrainer.length > 0 ? (
      <ul className="list-group">
        {filteredTrainer.map((trainer, index) => (
          <li
            key={index}
            className="list-group-item user-item"
            onClick={() => handleTrainerClick(trainer.trainerId, trainer.name)}
            style={{ cursor: "pointer" }} 
          >
            {trainer.name}
          </li>
        ))}
      </ul>
      ) : (
        <h5 className="mt-5 gradient-text ">
            No recent trainers found
        </h5>
    )}
    </div>
  );
}

export default ChatTrainerList;
