import React from "react";

function ChatTrainerList({ searchTerm, setSearchTerm, filteredTrainers, handleTrainerClick }) {
  return (
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
            style={{ cursor: "pointer" }} 
          >
            {trainer.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatTrainerList;
