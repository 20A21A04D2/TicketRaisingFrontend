// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Signup.css';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     type: '',
//     password: ''
//   });

//   const { username, email, type, password } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
    
//     // Email validation
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//       toast.error('Invalid email address');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/signup', formData);
//       toast.success('User added successfully');
//       console.log(response.data);
//     } catch (error) {
//       const errorMessage = error.response ? error.response.data.error : 'Server error';
//       toast.error(errorMessage);
//       console.error(error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="parent-container">
//       <div className="signup-card">
//         <form onSubmit={onSubmit} className="signup-form">
//           <h2>Sign Up</h2>
//           <div className="form-group">
//             <label>Username</label>
//             <input
//               type="text"
//               name="username"
//               value={username}
//               onChange={onChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={onChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Type</label>
//             <select name="type" value={type} onChange={onChange} required>
//               <option value="">Select Type</option>
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//               <option value="developer">Developer</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={password}
//               onChange={onChange}
//               required
//             />
//           </div>
//           <button type="submit">Sign Up</button>
//           <p>
//             Have an account? <a href="/signin">Login here</a>
//           </p>
//         </form>
//         <ToastContainer position='top-center' />
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    type: '',
    password: '',
    secretKey: ''  
  });
  const navigate = useNavigate();
  const { username, email, type, password, secretKey } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Invalid email address');
      return;
    }

    
    const validSecretKey = '9141725777';  
    if (type === 'admin') {
      if (!secretKey) {
        toast.error('Secret key is required for admin');
        return;
      }
      if (secretKey !== validSecretKey) {
        toast.error('Invalid secret key');
        return;
      }
    }

   
    const { secretKey: _, ...dataToSend } = formData;

    try {

      const response = await axios.post('https://ticketraisingbackend.onrender.com/api/signup', dataToSend);

  
      if (type === 'admin') {
        toast.success('Admin added successfully');
      } else if(type==='developer') {
        toast.success('Developer added successfully');
      }else{
        toast.success('User added successfully')
      }

      console.log(response.data);
      
     
      setTimeout(() => {
        navigate('/signin');
      }, 2000);  
    } catch (error) {
      console.error(error);
      toast.error('Server error');
    }
  };

  return (
    <div className="parent-container">
      <div className="signup-card">
        <form onSubmit={onSubmit} className="signup-form">
          <h2>Sign Up</h2>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group" style={{ width: '520px' }}>
            <label>Type</label>
            <select name="type" value={type} onChange={onChange} required>
              <option value=""></option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
            </select>
          </div>
          {type === 'admin' && (
            <div className="form-group">
              <label>Secret Key</label>
              <input
                type="text"
                name="secretKey"
                value={secretKey}
                onChange={onChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
          <p>
            Have an account? <a href="/signin">Login here</a>
          </p>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default Signup;
