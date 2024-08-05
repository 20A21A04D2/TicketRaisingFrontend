import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RaiseTicket.css';

function RaiseTicket() {
  const [ticketName, setTicketName] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketType, setTicketType] = useState('Medium');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem('userEmail');
    console.log(email)
    console.log(  ticketName,
        ticketDescription,
        ticketType,
         email)
    
    try {
      const response = await axios.post('https://ticketraisingbackend.onrender.com/api/addticket', {
        ticketName,
        ticketDescription,
        ticketType,
        email: email,
        status: 'pending'
      });
      console.log('Response:', response);
      toast.success('Ticket raised successfully!');
      setTimeout(() => navigate('/user-dashboard'), 2000); 
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to raise ticket');
    }
  };

  return (
    <div className="raise-ticket-container">
      <form onSubmit={handleSubmit} className="raise-ticket-form">
        <h2>Raise a Ticket</h2>
        <div className="form-group">
          <label>Ticket Name:</label>
          <input
            type="text"
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ticket Description:</label>
          <input
            value={ticketDescription}
            onChange={(e) => setTicketDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select
            value={ticketType}
            style={{width:"400px"}}
            onChange={(e) => setTicketType(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default RaiseTicket;
