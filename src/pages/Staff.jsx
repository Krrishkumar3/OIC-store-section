import React from 'react';
import './Staff.css'; // We will create this file next

export default function Staff() {
  // Data taken directly from your provided photo of the old site
  const staffMembers = [
    { id: 1, name: "Dr. Rajesh Birok", designation: "Officer In-charge"},
    { id: 2, name: "Shri Anjanay Kumar", designation: "Section Officer"},
    { id: 3, name: "Shri Shushant(consumable)", designation: "Junior officer assistant"},
    { id: 4, name: "Mrs. Anuradha(Non-consumable)", designation: "Assistant store keeper"},
    { id: 5, name: "Shri Tarun Kumar", designation: "MTS"},
  ];

  return (
    <div className="staff-container">
      <div className="staff-header">
        <h1>STAFF DETAILS</h1>
      </div>

      <div className="table-wrapper">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Branch In-charge / Staff Detail</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>
                  <span className="staff-name">{staff.name}</span>, 
                  <span className="staff-designation"> {staff.designation}</span>
                </td>
            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}