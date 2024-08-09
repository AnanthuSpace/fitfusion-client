import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'pending' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'true' },
  { id: 3, name: 'Mark Johnson', email: 'mark.johnson@example.com', status: 'pending' },
];

function UserManagement() {
  const [userList, setUserList] = useState(users);

  const handleVerify = (id, newStatus) => {
    setUserList(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleToggleBlock = (id) => {
    setUserList(prevUsers =>
      prevUsers.map(user =>
        user.id === id
          ? { ...user, blocked: !user.blocked }
          : user
      )
    );
  };

  return (
    <div className="container-fluid p-3 flex-column" style={{ backgroundColor: 'black', color: 'white' }}>
      <h2>User Management</h2>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.status === 'pending' ? (
                  <>
                    <FaCheck
                      className="text-success me-3"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleVerify(user.id, 'true')}
                    />
                    <FaTimes
                      className="text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleVerify(user.id, 'false')}
                    />
                  </>
                ) : (
                  <span className={`badge ${user.status === 'true' ? 'bg-success' : 'bg-danger'}`}style={{ width: '100px' }}>
                    {user.status === 'true' ? 'Verified' : 'Rejected'}
                  </span>
                )}
              </td>
              <td>
                <button
                  className={`btn ${user.blocked ? 'btn-danger' : 'btn-secondary'}`}
                  style={{ width: '100px' }} 
                  onClick={() => handleToggleBlock(user.id)}
                >
                  {user.blocked ? 'Unblock' : 'Block'}
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
