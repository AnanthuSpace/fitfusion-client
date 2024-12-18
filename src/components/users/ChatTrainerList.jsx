import React, { useEffect, useState } from "react";
import userAxiosInstance from "../../config/axiosConfig";
import { useSelector } from "react-redux";
const localhostURL = import.meta.env.VITE_BASE_URL;

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
  const [directChat, setDirectChat] = useState(null);

  const [sortedAlreadyChattedTrainer, setSortedAlreadyChattedTrainer] =
    useState(
      [...alreadyChattedTrainer].sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      )
    );

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

      const sortedChatHistory = response.data.sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      );

      setChatHistory(sortedChatHistory);
      onSelectTrainer(trainerId, trainerName);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (directChatId) {
      const trainer = alreadyChattedTrainer.find(
        (trainer) => trainer.trainerId === directChatId
      );
      setDirectChat(trainer);
      handleTrainerClick(directChatId, directChatName);
    }
  }, [directChatId]);

  useEffect(() => {
    setSortedAlreadyChattedTrainer(
      [...alreadyChattedTrainer].sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      )
    );
  }, [alreadyChattedTrainer]);

  const noTrainersFound =
    !directChatId && sortedAlreadyChattedTrainer.length === 0;

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
          {directChat ? (
            <li
              key={directChat.trainerId}
              className="list-group-item user-item"
              onClick={() =>
                handleTrainerClick(directChat.trainerId, directChat.name)
              }
              style={{ cursor: "pointer" }}
            >
                 <div>{directChat.name}</div>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ color: "gray" }}
              >
                <p style={{ color: "gray", marginBottom: "0" }}>
                  {directChat.message
                    ? directChat.message.length > 15
                      ? `${directChat.message.slice(0, 15)}...`
                      : directChat.message
                    : "No messages yet"}
                </p>
                {directChat.time && (
                  <small style={{ color: "lightgray" }}>
                    {new Date(directChat.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                )}
              </div>
            </li>
          ) : (
            <li
              className="list-group-item user-item"
              onClick={() => handleTrainerClick(directChatId, directChatName)}
            >
              {console.log(directChat)}
              {directChatName}
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ color: "gray" }}
              >
                 <p style={{ color: "gray", marginBottom: "0" }}>No messages yet</p>
              </div>
            </li>
          )}
        </ul>
      )}
      {sortedAlreadyChattedTrainer.length > 0 ? (
        <ul className="list-group">
          {sortedAlreadyChattedTrainer.map((trainer) =>
            directChatId !== trainer.trainerId ? (
              <li
                key={trainer.trainerId}
                className="list-group-item user-item"
                onClick={() =>
                  handleTrainerClick(trainer.trainerId, trainer.name)
                }
                style={{ cursor: "pointer" }}
              >
                <div>{trainer.name}</div>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ color: "gray" }}
                >
                  <p style={{ color: "gray", marginBottom: "0" }}>
                    {trainer.message
                      ? trainer.message.length > 15
                        ? `${trainer.message.slice(0, 15)}...`
                        : trainer.message
                      : "No messages yet"}
                  </p>
                  {trainer.time && (
                    <small style={{ color: "lightgray" }}>
                      {new Date(trainer.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  )}
                </div>
              </li>
            ) : null
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
