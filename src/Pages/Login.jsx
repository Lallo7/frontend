import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie'; // Import Cookies
import './CSS/LoginSignup.css';
import emailicon from '../Components/Assets/email-icon.png';
import passwordicon from '../Components/Assets/password-icon.png';
import { BASE_URL, parseErrorMessage } from '../config';
import Navbar from '../Components/Navbar/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Login successful
        const userData = response.data;
        console.log('Login successful:', userData);

        // Store token in cookie
        Cookies.set('auth_token', userData.token);
        Cookies.set('role', userData.role);
        setSuccess('Logged In Successfully!');
        setError('');

        // Redirect to user dashboard with user data
        window.location.href = '/';
      } else {
        setError(response.data.message || 'Login failed');
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed');
        console.error('Login failed:', error.response.data);
      } else {
        setError('Login failed: Network error');
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <img src={emailicon} alt="Email Icon" className="icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
              autoFocus
            />
          </div>
          <div className="loginsignup-fields">
            <img src={passwordicon} alt="Password Icon" className="icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
        <p className="loginsignup-login">Don't have an account? <span><Link to="/signup">Sign Up</Link></span></p>
      </div>
    </div>
  );
};

export default Login;
