import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TicketForm = () => {
  const { ticketId } = useParams();
  const [ticketName, setTicketName] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('Completed');
  const [solution, setSolution] = useState('');
  const navigate = useNavigate();

  const fetchTicket = async () => {
    try {
      const response = await axios.get(`https://ticketraisingbackend.onrender.com/api/getticket/${ticketId}`);
      setTicketName(response.data.ticketName);
      setTicketDescription(response.data.ticketDescription);
      setProjectName(response.data.projectName); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://ticketraisingbackend.onrender.com/api/completeticket', { ticketId, status, solution });
      toast.success('Work completed');
      setTimeout(() => navigate('/dd-dashboard'), 1200); 
    } catch (err) {
      toast.error('Failed to update ticket status');
      console.error(err);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  return (
    <div className="raise-ticket-container">
      <ToastContainer position="top-center"  />
      <div className="raise-ticket-form">
        <h2>Update Ticket Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="ticketName">Ticket Name:</label>
            <input
              type="text"
              id="ticketName"
              value={ticketName}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="ticketDescription">Ticket Description:</label>
            <input
              type="text"
              id="ticketDescription"
              value={ticketDescription}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              style={{ width: '495px' }}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Completed">Completed</option>
              <option value="Incompleted">Incompleted</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="solution">Solution:</label>
            <textarea
              id="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              style={{ width: '494px', height: '40px',border:'5px' }}
            />
          </div>
          <button type="submit" className="submit-button">Update Status</button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
