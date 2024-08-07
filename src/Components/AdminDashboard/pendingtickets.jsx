import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingTickets = () => {
  const [pendingTickets, setPendingTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  useEffect(() => {
    axios.get('https://ticketraisingbackend.onrender.com/api/pending-tickets')
      .then(response => setPendingTickets(response.data))
      .catch(error => console.error('Error fetching pending tickets:', error));
  }, []);


  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = pendingTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="tickets-table-container_task">
      <h1 className="tickets-table-heading_task">Pending Tickets</h1>
      <div className="ticket-table">
        <table className="tickets-table_task">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Ticket Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map(ticket => (
              <tr key={ticket._id}>
                <td>{ticket.projectName}</td>
                <td>{ticket.ticketName}</td>
                <td>{ticket.ticketDescription}</td>
                <td>{ticket.ticketType}</td>
                <td>{ticket.email}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination_task">
        {Array.from({ length: Math.ceil(pendingTickets.length / ticketsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PendingTickets;
