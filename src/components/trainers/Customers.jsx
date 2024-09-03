import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import trainerAxiosInstance from "../../config/axiosTrainerConfig";
import { IoIosChatbubbles } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Customers() {
  const trainerData = useSelector((state) => state.trainer.trainerData);
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  const handleChatWithCustomer = ({ customerId, customerName }) => {
    navigate("/trainer-chat", {
      state: { customerId: customerId, customerName: customerName },
    });
  };

  useEffect(() => {
    const fetchSubscribedUsers = async () => {
      try {
        if (
          trainerData.subscribedUsers &&
          trainerData.subscribedUsers.length > 0
        ) {
          const response = await trainerAxiosInstance.post(
            "/trainer/customers",
            {
              userIds: trainerData.subscribedUsers,
            }
          );
          setUsersData(response.data.customers);
        }
      } catch (error) {
        console.error("Error fetching subscribed users:", error);
      }
    };

    fetchSubscribedUsers();
  }, [trainerData.subscribedUsers]);

  return (
    <div className="container-fluid p-3 flex-column" style={{ color: "white" }}>
      <h2>Customers</h2>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Phone</th>
            <th scope="col">Weight</th>
            <th scope="col">Goals</th>
            <th scope="col">Activity Level</th>
            <th scope="col">Dietary</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(usersData) && usersData.length > 0 ? (
            usersData.map((user, index) => (
              <tr key={user.userId}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>
                  <span
                    style={{
                      height: "10px",
                      width: "10px",
                      backgroundColor: user.isActive ? "green" : "red",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></span>
                </td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.phone || "Not updated"}</td>
                <td>{user.weight || "Not updated"}</td>
                <td>{user.goals || "Not updated"}</td>
                <td>{user.activityLevel || "Not updated"}</td>
                <td>{user.dietary || "Not updated"}</td>
                <td>{user.address || "Not updated"}</td>
                <td>
                  <IoIosChatbubbles
                    size={24}
                    onClick={() =>
                      handleChatWithCustomer({
                        customerId: user.userId,
                        customerName: user.name,
                      })
                    }
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
