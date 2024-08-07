import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ViewTicket.css'; 

const ViewTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`https://ticketraisingbackend.onrender.com/api/getticket/${id}`)
      .then(response => setTicket(response.data))
      .catch(error => console.error('Error fetching ticket:', error));
  }, [id]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="view-ticket-container">
      <div className="view-ticket-details">
        <Link to="/user-dashboard" className="back-button">Back</Link>
        <h3>View Ticket</h3>
        <div className="ticket-details">
          <p><strong>ProjectName:</strong> {ticket.projectName}</p>
          <p><strong>Ticket Name:</strong> {ticket.ticketName}</p>
          <p><strong>Description:</strong> {ticket.ticketDescription}</p>
          <p><strong>Type:</strong> {ticket.ticketType}</p>
          <p><strong>Status:</strong> pending</p>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
