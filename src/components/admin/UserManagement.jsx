import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleUnblockUser, handleBlockUser } from "../../redux/admin/adminThunk";

function UserManagement() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.admin.usersData);

  const handleToggleBlock = (user) => {
    if (user.isBlocked) {
      dispatch(handleUnblockUser({ userId: user.userId }));
    } else {
      dispatch(handleBlockUser({ userId: user.userId }));
    }
  };

  return (
    <div
      className="container-fluid p-3 flex-column"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <h2 className="short-gradient-text-blue">User Management</h2>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, index) => (
            <tr key={user.userId}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender || "Not updated"}</td>
              <td>{user.phone || "Not updated"}</td>
              <td>
                <button
                  className={`btn ${
                    user.isBlocked ? "gradient-red-white" : "gradient-blue-white"
                  }`}
                  style={{ width: "100px", color: "white" }}
                  onClick={() => handleToggleBlock(user)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
