import React from "react";
import trainerAxiosInstance from "../../config/axiosTrainerConfig";
import { localhostURL } from "../../utils/url";
import { useSelector } from "react-redux";

const CustomerList = ({ searchTerm, setSearchTerm, currentCustomerId, currentCustomerName, onSelectCustomer, setChatHistory }) => {
    const trainerId = useSelector((state)=>state.trainer.trainerData.trainerId)
    const handleCreateRoom = async () => {
      
      try {
        const response = await trainerAxiosInstance.get(`${localhostURL}/chat/fetchChat`, {
          params: {
            trainerId: trainerId,
            userId: currentCustomerId,
          },
        });      
        const sortedChatHistory = response.data.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setChatHistory(sortedChatHistory);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    onSelectCustomer(currentCustomerId, currentCustomerName);
  };

  return (
    <div className="col-3 p-2 user-list border-end" style={{ borderWidth: '1px', borderColor: 'white' }}>
      <input
        type="text"
        className="form-control mb-3 chat-txt"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {currentCustomerId ? (
        <ul className="list-group">
          <li
            key={currentCustomerId}
            className="glass-effect"
            onClick={handleCreateRoom}
          >
            {currentCustomerName}
          </li>
        </ul>
      ) : (
        <h5 className="mt-5 short-gradient-text-blue">
          No recent customers found
        </h5>
      )}
    </div>
  );
};

export default CustomerList;
