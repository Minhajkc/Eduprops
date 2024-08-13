import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard">
      <WelcomeMessage name="Ayodele Irepodun" newStudents={27} />
      <div className="dashboard-grid">
     <h1>heloo dashboard</h1>
        <Documents />
      </div>
    </div>
  );
}

export default Dashboard;