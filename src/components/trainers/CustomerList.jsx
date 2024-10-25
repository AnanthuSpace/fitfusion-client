import { useEffect } from "react";
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
}) => {
  const trainerId = useSelector((state) => state.trainer.trainerData.trainerId);

  // const [filteredCustomers, setFilteredCustomers] = useState([]);

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
      setChatHistory(response.data);
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
      {alreadyChattedCustomer.length > 0 ? (
        <ul className="list-group">
          {alreadyChattedCustomer.map(
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
