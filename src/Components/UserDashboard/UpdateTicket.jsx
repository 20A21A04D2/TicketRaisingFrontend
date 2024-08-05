import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RaiseTicket.css'; 

const EditTicket = () => {
  const initialTicket = {
    ticketName: "",
    ticketDescription: "",
    ticketType: ""
  };

  const { id } = useParams(); 
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(initialTicket);

  useEffect(() => {
    axios.get(`https://ticketraisingbackend.onrender.com/api/getticket/${id}`)
      .then((response) => {
        setTicket(response.data);
      })
      .catch((error) => {
        console.log('Error fetching ticket data:', error);
      });
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
   
    await axios.put(`https://ticketraisingbackend.onrender.com/api/updateticket/${id}`, ticket)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-center" });
        setTimeout(() => navigate('/user-dashboard'), 2000);        
      })
      .catch(error => console.log('Error updating ticket:', error));
  };

  return (
    <div className="raise-ticket-container">
      <form onSubmit={submitForm} className="raise-ticket-form">
        <h2>Update Ticket</h2>
        <div className="form-group">
          <label htmlFor="ticketName">Ticket Name:</label>
          <input
            type="text"
            id="ticketName"
            name="ticketName"
            value={ticket.ticketName}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            value={ticket.ticketDescription}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={ticket.ticketType}
            onChange={inputChangeHandler}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="submit-button-container">
          <button type="submit" className="submit-button">UPDATE</button>
        </div>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EditTicket;
