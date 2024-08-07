import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaUsers, FaExclamationTriangle, FaCheckCircle, FaUserTie, FaTasks, FaPlus, FaUser, FaChartBar, FaChartPie } from 'react-icons/fa'; // Updated icons
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const [pendingTicketCount, setPendingTicketCount] = useState(0);
  const [completedTicketCount, setCompletedTicketCount] = useState(0);
  const [developerCount, setDeveloperCount] = useState(0);
  const [workAssignmentCount, setWorkAssignmentCount] = useState(0);
  const [AssignmentCount, setAssignmentCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      navigate('/signin');
      return;
    }

    const fetchData = async () => {
      try {
        const userCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/user-count');
        const userCountData = await userCountResponse.json();
        setUserCount(userCountData.count);

        const ticketCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/ticket-count');
        const ticketCountData = await ticketCountResponse.json();
        setTicketCount(ticketCountData.count);

        const pendingTicketCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/pending-ticket-count');
        const pendingTicketCountData = await pendingTicketCountResponse.json();
        setPendingTicketCount(pendingTicketCountData.count);

        const completedTicketCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/completed-ticket-count');
        const completedTicketCountData = await completedTicketCountResponse.json();
        setCompletedTicketCount(completedTicketCountData.count);

        const developerCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/d-count');
        const developerCountData = await developerCountResponse.json();
        setDeveloperCount(developerCountData.count);

        const workAssignmentCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/work-assignment-count');
        const workAssignmentCountData = await workAssignmentCountResponse.json();
        setWorkAssignmentCount(workAssignmentCountData.count);

        const AssignmentCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/assignment-count');
        const AssignmentCountData = await AssignmentCountResponse.json();
        setAssignmentCount(AssignmentCountData.count);
        
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      <div><button className="logout-button" onClick={handleLogout}>  <i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Logout</button></div> 
      <h2 className="dashboard-heading">Welcome to Admin Dashboard</h2>
      <div className="cards-container">
        <div className="card" onClick={() => navigateTo('/tickettable')}>
          <FaTicketAlt className="card-icon" />
          <div className="card-content">
            <h3>Number of Tickets</h3>
            <p>{ticketCount}</p>
          </div>
        </div>
        <div className="card" onClick={() => navigateTo('/usertable')}>
          <FaUsers className="card-icon" />
          <div className="card-content">
            <h3>Number of Users</h3>
            <p>{userCount}</p>
          </div>
        </div>
        <div className="card" onClick={() => navigateTo('/pendingtickets')}>
          <FaExclamationTriangle className="card-icon" />
          <div className="card-content">
            <h3>Number of Pending Tickets</h3>
            <p>{pendingTicketCount}</p>
          </div>
        </div>
        <div className="card" onClick={() => navigateTo('/cticket')}>
          <FaCheckCircle className="card-icon" />
          <div className="card-content">
            <h3>Number of Completed Tickets</h3>
            <p>{completedTicketCount}</p>
          </div>
        </div>
        <div className="card" onClick={() => navigateTo('/devtable')}>
          <FaUserTie className="card-icon" />
          <div className="card-content">
            <h3>Number of Developers</h3>
            <p>{developerCount}</p>
          </div>
        </div>
        <div className="card" onClick={() => navigateTo('/incticket')}>
          <FaPlus className="card-icon" />
          <div className="card-content">
            <h3>Number of Incompleted Tickets</h3>
            <p>{AssignmentCount}</p>
          </div>
        </div>
        <div className="card" onClick={() => navigateTo('/w-assign')}>
          <FaTasks className="card-icon" />
          <div className="card-content">
            <h3>Work Assignments</h3>
          </div>
        </div>
        <div className="card" onClick={() => navigateTo('/assticket')}>
          <FaChartBar className="card-icon" />
          <div className="card-content">
            <h3>No of Assigned Tickets</h3>
            <p>{workAssignmentCount}</p>
          </div>
        </div>
        <div className="card" onClick={() => navigateTo('/signup')}>
          <FaUser className="card-icon" />
          <div className="card-content">
            <h3>Add Developer</h3>
          </div>
        </div>
        <div className="card" onClick={() => navigateTo('/view')}>
          <FaChartPie className="card-icon" />
          <div className="card-content">
            <h3>Visualization</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
