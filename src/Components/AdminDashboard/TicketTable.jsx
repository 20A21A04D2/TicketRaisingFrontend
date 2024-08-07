import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './TicketTable.css'; 
import { useNavigate } from 'react-router-dom';

const TicketsTable = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(11);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://ticketraisingbackend.onrender.com/api/tickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ticketraisingbackend.onrender.com/api/deleteticket/${id}`); 
      setTickets(tickets.filter(ticket => ticket._id !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleRaiseTicket = () => {
    navigate('/raise-ticket');
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.ticketName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticketDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticketType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="tickets-table-container_task">
      <h2 className="tickets-table-heading_task">Tickets List</h2>
      <div className="search-bar_container">
        <input
          type="text"
          placeholder="Search by all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar_input"
        />
        <button className="add-button" onClick={handleRaiseTicket}>
          <i className="bx bx-plus"></i> Add Ticket
        </button>
      </div>
      <table className="tickets-table_task">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Ticket Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.length === 0 ? (
            <tr>
              <td colSpan="7">No tickets found.</td>
            </tr>
          ) : (
            currentTickets.map(ticket => (
              <tr key={ticket._id}>
                <td>{ticket.projectName}</td>
                <td>{ticket.ticketName}</td>
                <td>{ticket.ticketDescription}</td>
                <td>{ticket.ticketType}</td>
                <td>{ticket.email}</td>
                <td>{ticket.status}</td>
                <td className="action-buttons1">
                  <button onClick={() => handleDelete(ticket._id)} className="delete-button" style={{background:"red"}}>
                    <i className="bx bx-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination_task">
        {Array.from({ length: Math.ceil(filteredTickets.length / ticketsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicketsTable;
