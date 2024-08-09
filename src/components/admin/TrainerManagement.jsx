import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const trainers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'pending' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'true' },
  { id: 3, name: 'Mark Johnson', email: 'mark.johnson@example.com', status: 'pending' },
];

function TrainerManagement() {
  const [trainerList, setTrainerList] = useState(trainers);

  const handleVerify = (id, newStatus) => {
    setTrainerList(prevTrainers =>
      prevTrainers.map(trainer =>
        trainer.id === id ? { ...trainer, status: newStatus } : trainer
      )
    );
  };

  const handleToggleBlock = (id) => {
    setTrainerList(prevTrainers =>
      prevTrainers.map(trainer =>
        trainer.id === id
          ? { ...trainer, blocked: !trainer.blocked }
          : trainer
      )
    );
  };

  return (
    <div className="container-fluid p-3 flex-column" style={{ backgroundColor: 'black', color: 'white' }}>
      <h2>Trainer Management</h2>
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
          {trainerList.map((trainer, index) => (
            <tr key={trainer.id}>
              <th scope="row">{index + 1}</th>
              <td>{trainer.name}</td>
              <td>{trainer.email}</td>
              <td>
                {trainer.status === 'pending' ? (
                  <>
                    <FaCheck
                      className="text-success me-3"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleVerify(trainer.id, 'true')}
                    />
                    <FaTimes
                      className="text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleVerify(trainer.id, 'false')}
                    />
                  </>
                ) : (
                  <span className={`badge ${trainer.status === 'true' ? 'bg-success' : 'bg-danger'}`}>
                    {trainer.status === 'true' ? 'Verified' : 'Rejected'}
                  </span>
                )}
              </td>
              <td>
                <button
                  className={`btn ${trainer.blocked ? 'btn-danger' : 'btn-secondary'}`}
                  style={{ width: '100px' }} // Fixed width for consistency
                  onClick={() => handleToggleBlock(trainer.id)}
                >
                  {trainer.blocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainerManagement;
