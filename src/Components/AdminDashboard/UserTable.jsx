import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './UserTable.css'; 

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('https://ticketraisingbackend.onrender.com/api/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://ticketraisingbackend.onrender.com/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = () => {
    navigate('/signup');
  };

  return (
    <div className="user-table-container">
      <h2 className="user-table-heading">User Table</h2>
      <div className="add-user-container">
        <button className="add-user-button" onClick={handleAddUser}>
          <i className="bx bx-plus"></i> Add User
        </button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="delete-user-button"
                >
                  <i className="bx bx-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
