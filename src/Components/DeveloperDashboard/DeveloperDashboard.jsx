import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeveloperDashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const DeveloperDashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 7;

  useEffect(() => {
    const fetchTickets = async () => {
      const userEmail = localStorage.getItem('userEmail');
      try {
        const response = await axios.get('https://ticketraisingbackend.onrender.com/api/getticket', { params: { email:userEmail } });
        setTickets(response.data);
        setFilteredTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [navigate]);

  useEffect(() => {
    const results = tickets.filter(ticket =>
      ticket.ticketName.toLowerCase().includes(search.toLowerCase()) ||
      ticket.ticketType.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTickets(results);
  }, [search, tickets]);

  const handleLogout = () => {
    localStorage.removeItem('UserEmail');
    navigate('/signin');
  };

  const handleCompleteTask = (ticket) => {
    navigate(`/c-task/${ticket._id}`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTickets.length / ticketsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="developer-dashboard">
      <div className="header">
        <h1 className="welcome-message">Welcome to Developer Dashboard</h1>
        <div className="button-group">
          <input
            type="text"
            placeholder="Search by ticket name or type"
            value={search}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button className="developer-logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
      <div className="tickets-table">
        <table>
          <thead>
            <tr>
              <th>Ticket Name</th>
              <th>Ticket Description</th>
              <th>Ticket Type</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.ticketName}</td>
                <td>{ticket.ticketDescription}</td>
                <td>{ticket.ticketType}</td>
                <td>{ticket.email}</td>
                <td>{ticket.status}</td>
                <td>
                  <button
                    className={`complete-task-button ${ticket.status === 'Completed' ? 'completed' : ''}`}
                    onClick={() => handleCompleteTask(ticket)}
                    disabled={ticket.status === 'Completed'}
                  >
                    <i className="fas fa-check"></i> {ticket.status === 'Completed' ? 'Task Completed' : 'Complete Task'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`pagination-button ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
