import React from 'react'
import "../../assets/styles/admin/TrainerManagement.css"

function TrainerManagement() {
  return (
    <div className="trainermanagement-div">
      <div className="trainermanagemet-table">
        <table>
          <thead>
            <tr>
              <th>Trainer Name</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>Advanced</td>
              <td>
                <button className="block-button">Block</button>
                <button className="unblock-button">Unblock</button>
                <button className="approval-button">Approve</button>
                <button className="rejection-button">Reject</button>
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>Intermediate</td>
              <td>
                <button className="block-button">Block</button>
                <button className="unblock-button">Unblock</button>
                <button className="approval-button">Approve</button>
                <button className="rejection-button">Reject</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TrainerManagement
