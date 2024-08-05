import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ticketraisingbackend.onrender.com/api/signin', formData);
      const { user } = response.data.message;

      localStorage.setItem('userEmail', email);

      toast.success('Sign in successful');
      if (user === 'admin') {
        navigate('/admin-dashboard');
      } else if (user === 'user') {
        navigate('/user-dashboard');
      } else {
        navigate('/dd-dashboard');
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Invalid credentials');
      }
    }
  };

  return (
    <div className="signin-parent-container">
      <form onSubmit={onSubmit} className="signin-child-card">
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        <div className="signin-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="signin-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
        <p>
          Haven't an account? <a href="/signup">Register here</a>
        </p>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SignIn;
