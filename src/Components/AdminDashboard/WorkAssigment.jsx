import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WorkAssigment.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const WorkAssignmentForm = () => {
  const [tickets, setTickets] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [selectedTicket, setSelectedTicket] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketsAndDevelopers = async () => {
      try {
        const ticketsResponse = await axios.get('https://ticketraisingbackend.onrender.com/api/pending-ticket');
        setTickets(ticketsResponse.data);

        const developersResponse = await axios.get('https://ticketraisingbackend.onrender.com/api/developers');
        setDevelopers(developersResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchTicketsAndDevelopers();
  }, []);

  const handleTicketChange = (e) => {
    const selectedTicketId = e.target.value;
    setSelectedTicket(selectedTicketId);

    const selectedTicket = tickets.find(ticket => ticket._id === selectedTicketId);
    if (selectedTicket) {
      setProjectName(selectedTicket.projectName);
    } else {
      setProjectName('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ticketraisingbackend.onrender.com/api/assign-ticket', {
        ticketId: selectedTicket,
        developerId: selectedDeveloper,
      });
      Swal.fire({
        icon: 'success',
        title: 'Ticket assigned successfully!',
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => navigate('/admin-dashboard'), 2000); 
    } catch (error) {
      console.error('Failed to assign ticket:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to assign ticket',
        text: error.message,
      });
    }
  };

  return (
    <div className="app-wrapper">
      <div className="work-assignment-form">
        <h2 className="work-assignment-form__heading">Work Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div className="work-assignment-form__group">
            <label className="work-assignment-form__label">Project:</label>
            <input
              type="text"
              style={{width:"380px"}}
              className="work-assignment-form__input"
              value={projectName}
              readOnly
            />
          </div>
          <div className="work-assignment-form__group">
            <label className="work-assignment-form__label">Ticket:</label>
            <select
              className="work-assignment-form__select"
              value={selectedTicket}
              onChange={handleTicketChange}
              required
            >
              <option value="" disabled>Select a ticket</option>
              {tickets.map(ticket => (
                <option key={ticket._id} value={ticket._id}>
                  {ticket.ticketName} - {ticket.ticketDescription}
                </option>
              ))}
            </select>
          </div>
          <div className="work-assignment-form__group">
            <label className="work-assignment-form__label">Developer:</label>
            <select
              className="work-assignment-form__select"
              value={selectedDeveloper}
              onChange={(e) => setSelectedDeveloper(e.target.value)}
              required
            >
              <option value="" disabled>Select a developer</option>
              {developers.map(developer => (
                <option key={developer._id} value={developer._id}>
                  {developer.username}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="work-assignment-form__button">Assign Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default WorkAssignmentForm;
