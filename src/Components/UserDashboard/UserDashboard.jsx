import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css';
import 'boxicons/css/boxicons.min.css';

const ITEMS_PER_PAGE = 6; 

function UserDashboard() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
 

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    axios.get('https://ticketraisingbackend.onrender.com/api/alltickets', {
      params: { email: userEmail }
    })
      .then(response => {
        setTickets(response.data);
        setFilteredTickets(response.data);
        setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
      })
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() === '') {
      setFilteredTickets(tickets);
    } else {
      const results = tickets.filter(ticket =>
        ticket.ticketName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTickets(results);
    }
    setCurrentPage(1); 
    setTotalPages(Math.ceil(filteredTickets.length / ITEMS_PER_PAGE));
  };

  const handleRaiseTicket = () => {
    navigate('/raise-ticket');
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  const handleUpdate = (id) => {
    navigate(`/editticket/${id}`);
  };

  const handleView = (id) => {
    navigate(`/viewticket/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`https://ticketraisingbackend.onrender.com/api/deleteticket/${id}`)
      .then(() => {
        setTickets(tickets.filter(ticket => ticket._id !== id));
        setFilteredTickets(filteredTickets.filter(ticket => ticket._id !== id));
        setTotalPages(Math.ceil(filteredTickets.length / ITEMS_PER_PAGE));
      })
      .catch(error => console.error('Error deleting ticket:', error));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to User Dashboard</h1>
      </div>
      <div className="header-actions">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by Ticket Name"
          />
          <button style={{height:"40px",width:"140px"}}onClick={handleSearchClick}>
            <i className="bx bx-search"></i> Search
          </button>
        </div>
        <div className="action-buttons">
          <button className="raise-ticket-button" onClick={handleRaiseTicket}>
            <i className="bx bx-plus"></i> Raise Ticket
          </button>
          <button className="logout-button" onClick={handleLogout}style={{background:"red"}}>
            <i className="bx bx-log-out"></i> Logout
          </button>
        </div>
      </div>
      <div className="ticket-table">
        <table>
          <thead>
            <tr>
              <th>Ticket Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map(ticket => (
              <tr key={ticket._id}>
                <td>{ticket.ticketName}</td>
                <td>{ticket.ticketDescription}</td>
                <td>{ticket.ticketType}</td>
                <td>{ticket.status}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handleView(ticket._id)}>
                      <i className="bx bx-show"></i> View
                    </button>
                    <button onClick={() => handleUpdate(ticket._id)}>
                      <i className="bx bx-edit"></i> Update
                    </button>
                    <button onClick={() => handleDelete(ticket._id)}>
                      <i className="bx bx-trash"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
