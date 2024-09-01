import React from "react";
import trainerAxiosInstance from "../../config/axiosTrainerConfig";
import { localhostURL } from "../../utils/url";
import { useSelector } from "react-redux";

const CustomerList = ({ searchTerm, setSearchTerm, onSelectCustomer, setChatHistory, alreadyChattedCustomer }) => {
    const trainerId = useSelector((state) => state.trainer.trainerData.trainerId);

    const handleCreateRoom = async (userId, userName) => {
        try {
            const response = await trainerAxiosInstance.get(`${localhostURL}/chat/fetchChat`, {
                params: {
                    trainerId: trainerId,
                    userId: userId,
                },
            });
            const sortedChatHistory = response.data.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            setChatHistory(sortedChatHistory);
            onSelectCustomer(userId, userName);
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    const filteredCustomers = alreadyChattedCustomer.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="col-3 p-2 user-list border-end" style={{ borderWidth: '1px', borderColor: 'white' }}>
            <input
                type="text"
                className="form-control mb-3 chat-txt"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                <h5 className="mt-5 short-gradient-text-blue">
                    No recent customers found
                </h5>
            )}
        </div>
    );
};

export default CustomerList;
