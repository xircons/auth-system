import React from 'react';

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      <h2>Welcome, {user}!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;