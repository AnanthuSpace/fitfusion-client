import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  handleUnblockUser,
  handleBlockUser,
  fetchUser,
} from "../../redux/admin/adminThunk";

function UserManagement() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadTrainers(1);
  }, []);

  const handleToggleBlock = (user) => {
    if (user.isBlocked) {
      dispatch(handleUnblockUser({ userId: user.userId }));
    } else {
      dispatch(handleBlockUser({ userId: user.userId }));
    }
  };

  const loadTrainers = async (page) => {
    dispatch(fetchUser(page)).then((res) => {
      setUserData(res.payload);
      setCurrentPage(page);
    });
  };

  const handlePageChange = (newPage) => {
    loadTrainers(newPage);
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
          {userData.map((user, index) => (
            <tr key={user.userId}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender || "Not updated"}</td>
              <td>{user.phone || "Not updated"}</td>
              <td>
                <button
                  className={`btn ${
                    user.isBlocked
                      ? "gradient-red-white"
                      : "gradient-blue-white"
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
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {userData.length < 5 ? (
          <button className="btn btn-secondary">End</button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
