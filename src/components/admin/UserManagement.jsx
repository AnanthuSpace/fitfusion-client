import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  handleUnblockUser,
  handleBlockUser,
  fetchUser,
} from "../../redux/admin/adminThunk";
import { Modal, Button } from "react-bootstrap";

function UserManagement() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers(1);
  }, []);

  const handleToggleBlock = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmToggleBlock = () => {
    const action = selectedUser.isBlocked ? handleUnblockUser : handleBlockUser;

    dispatch(action({ userId: selectedUser.userId })).then((res) => {
      if (res.payload.data.success) {
        loadUsers(1);
      }
    });
    setShowModal(false);
  };

  const loadUsers = async (page) => {
    dispatch(fetchUser(page)).then((res) => {
      setUserData(res.payload);
      setCurrentPage(page);
    });
  };

  const handlePageChange = (newPage) => {
    loadUsers(newPage);
  };

  return (
    <div
      className="container-fluid p-3 flex-column"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <h2 className="short-gradient-text-blue">User Management</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search trainers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            color: "white",
            backgroundColor: "black",
            borderColor: "white",
            borderRadius: "4px",
            padding: "8px",
          }}
        />
        <style>
          {`
            .form-control::placeholder {
              color: white;
            }
          `}
        </style>
      </div>
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
      <Modal show={showModal} centered contentClassName="p-0">
        <Modal.Header
          style={{ backgroundColor: "black", borderBottom: "none" }}
        >
          <Modal.Title className="w-100 text-center text-white">
            Confirm Action
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          {selectedUser && selectedUser.isBlocked
            ? "Are you sure you want to unblock this user?"
            : "Are you sure you want to block this user?"}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "black",
            borderTop: "none",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{ width: "30%", border: "none" }}
            className="gradient-blue-white ms-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="gradient-red-white me-1"
            onClick={confirmToggleBlock}
            style={{ width: "30%" }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserManagement;
