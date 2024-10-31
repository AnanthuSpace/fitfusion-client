import { useEffect, useState } from "react";
import trainerAxiosInstance from "../../config/axiosTrainerConfig";
import { localhostURL } from "../../utils/url";
import { useSelector } from "react-redux";

const CustomerList = ({
  searchTerm,
  setSearchTerm,
  onSelectCustomer,
  setChatHistory,
  alreadyChattedCustomer,
  directChatId,
  directChatName,
  setSelectedId,
  rerender
}) => {
  const trainerId = useSelector((state) => state.trainer.trainerData.trainerId);

  const [sortedAlreadyChattedCustomer, setSortedAlreadyChattedCustomer] =
    useState(
      [...alreadyChattedCustomer].sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      )
    );

  const handleCreateRoom = async (userId, userName) => {
    try {
      setSelectedId(userId);
      const response = await trainerAxiosInstance.get(
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
      onSelectCustomer(userId, userName);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (directChatId) {
      handleCreateRoom(directChatId, directChatName);
    }
  }, [directChatId]);

  useEffect(() => {
    setSortedAlreadyChattedCustomer(
      [...alreadyChattedCustomer].sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      )
    );
  }, [alreadyChattedCustomer, rerender]);

  const noCustomersFound = !directChatId && alreadyChattedCustomer.length === 0;

  return (
    <div
      className="col-3 p-2 user-list border-end"
      style={{ borderWidth: "1px", borderColor: "white" }}
    >
      <input
        type="text"
        className="form-control mb-3 chat-txt"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {directChatId && (
        <ul className="list-group">
          <li
            className="glass-effect p-3 mb-2"
            onClick={() => handleCreateRoom(directChatId, directChatName)}
          >
            {directChatName}
          </li>
        </ul>
      )}
      {sortedAlreadyChattedCustomer.length > 0 ? (
        <ul className="list-group">
          {sortedAlreadyChattedCustomer.map(
            (customer) =>
              directChatId !== customer.userId && (
                <li
                  key={customer.userId}
                  className="glass-effect p-3 mb-2"
                  onClick={() =>
                    handleCreateRoom(customer.userId, customer.name)
                  }
                >
                  {customer.name}
                  <p style={{ color: "gray" }}>
                    {customer.message
                      ? customer.message.length > 15
                        ? `${customer.message.slice(0, 15)}...`
                        : customer.message
                      : "No messages yet"}
                  </p>
                </li>
              )
          )}
        </ul>
      ) : (
        noCustomersFound && (
          <h5 className="mt-5 short-gradient-text-blue">
            No recent customers found
          </h5>
        )
      )}
    </div>
  );
};

export default CustomerList;
