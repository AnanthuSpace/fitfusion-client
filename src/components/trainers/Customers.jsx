import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import trainerAxiosInstance from "../../config/axiosTrainerConfig";

function Customers() {
  const trainerData = useSelector((state) => state.trainer.trainerData);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchSubscribedUsers = async () => {
      try {
        if (trainerData.subscribedUsers && trainerData.subscribedUsers.length > 0) {
          const response = await trainerAxiosInstance.post("/trainer/customers", {
            userIds: trainerData.subscribedUsers,
          });
          console.log(response.data.customers);
          setUsersData(response.data.customers);  
        }
      } catch (error) {
        console.error("Error fetching subscribed users:", error);
      }
    };

    fetchSubscribedUsers();
  }, [trainerData.subscribedUsers]);

  return (
    <div
      className="container-fluid p-3 flex-column"
      style={{color: "white" }}
    >
      <h2>Customers</h2>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
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
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.phone || "Not updated"}</td>
                <td>{user.weight || "Not updated"}</td>
                <td>{user.goals || "Not updated"}</td>
                <td>{user.activityLevel || "Not updated"}</td>
                <td>{user.dietary || "Not updated"}</td>
                <td>{user.address || "Not updated"}</td>
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
