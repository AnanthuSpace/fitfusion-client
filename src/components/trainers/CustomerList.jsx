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
}) => {
  const trainerId = useSelector((state) => state.trainer.trainerData.trainerId);

  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const handleCreateRoom = async (userId, userName) => {
    try {
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
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      setChatHistory(sortedChatHistory);
      onSelectCustomer(userId, userName);

      setFilteredCustomers((prev) => {
        const updatedList = prev.filter(customer => customer.userId !== userId);
        return [{ userId, name: userName }, ...updatedList];
      });
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    const filtered = alreadyChattedCustomer.filter(
      (customer) =>
        customer.userId !== directChatId &&
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, alreadyChattedCustomer, directChatId]);

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
      {filteredCustomers.length > 0 ? (
        <ul className="list-group">
          {filteredCustomers.map((customer) => (
            <li
              key={customer.userId}
              className="glass-effect p-3 mb-2"
              onClick={() => handleCreateRoom(customer.userId, customer.name)}
            >
              {customer.name}
            </li>
          ))}
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
