import React, { useEffect, useState } from "react";
import userAxiosInstance from "../../config/axiosConfig";
import { useSelector } from "react-redux";
import { localhostURL } from "../../utils/url";

function ChatTrainerList({
  searchTerm,
  setSearchTerm,
  onSelectTrainer,
  setChatHistory,
  alreadyChattedTrainer,
  directChatId,
  directChatName,
}) {
  const userId = useSelector((state) => state.user.userData.userId);

  const handleTrainerClick = async (trainerId, trainerName) => {
    try {
      const response = await userAxiosInstance.get(
        `${localhostURL}/chat/fetchChat`,
        {
          params: {
            trainerId: trainerId,
            userId: userId,
          },
        }
      );
      setChatHistory(response.data);
      onSelectTrainer(trainerId, trainerName);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (directChatId) {
      handleTrainerClick(directChatId, directChatName);
    }
  }, [directChatId]);

  const noTrainersFound = !directChatId && alreadyChattedTrainer.length === 0;

  return (
    <div className="col-3 p-3">
      <input
        type="text"
        className="form-control mb-3 chat-txt"
        placeholder="Search trainers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {directChatId && (
        <ul className="list-group">
          <li
            className="list-group-item user-item"
            onClick={() => handleTrainerClick(directChatId, directChatName)}
          >
            {directChatName}
          </li>
        </ul>
      )}
      {alreadyChattedTrainer.length > 0 ? (
        <ul className="list-group">
          {alreadyChattedTrainer.map(
            (trainer) =>
              directChatId !== trainer.trainerId && (
                <li
                  key={trainer.trainerId}
                  className="list-group-item user-item"
                  onClick={() =>
                    handleTrainerClick(trainer.trainerId, trainer.name)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {trainer.name}
                </li>
              )
          )}
        </ul>
      ) : (
        noTrainersFound && (
          <h5 className="mt-5 gradient-text">No recent trainers found</h5>
        )
      )}
    </div>
  );
}

export default ChatTrainerList;
