import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RaiseTicket.css';

function RaiseTicket() {
  const [ticketName, setTicketName] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketType, setTicketType] = useState('Low');
  const [projectName, setProjectName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem('userEmail');
    console.log(ticketName,ticketDescription,ticketType,projectName,email)
    
    try {
      const response = await axios.post('https://ticketraisingbackend.onrender.com/api/addticket', {
        ticketName,
        ticketDescription,
        ticketType,
        projectName,
        email,
        status: 'pending'
      });

      if (response.status === 201) {
        toast.success('Ticket raised successfully!');
        setTimeout(() => navigate('/user-dashboard'), 2000); 
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'Email is required') {
        toast.error('Email is required.');
        setTimeout(() => navigate('/signin'), 2000); 
      } else {
        console.error('Error:', error);
        toast.error('Failed to raise ticket');
      }
    }
  };

  return (
    <div className="raise-ticket-container">
      <form onSubmit={handleSubmit} className="raise-ticket-form">
        <h2>Raise a Ticket</h2>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
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
            style={{width:"495px"}}
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
