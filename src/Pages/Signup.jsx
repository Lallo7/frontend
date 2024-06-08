import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
import usericon from '../Components/Assets/user-icon.png';
import emailicon from '../Components/Assets/email-icon.png';
import passwordicon from '../Components/Assets/password-icon.png';
import { BASE_URL, parseErrorMessage } from "../config";


const LoginSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error('Error: ' + response.statusText + ' ' + JSON.stringify(err));
      }

      const data = await response.json();
      setSuccess('Signup successful! Redirecting to login page...');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } 
    // Example usage in a catch block
    catch (error) {
      const errorMessage = parseErrorMessage(error);
      setError(errorMessage);
      setSuccess('');
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <form onSubmit={handleSignup}>
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <img src={usericon} alt="User Icon" className="icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Your Name'
              required
              autoFocus
            />
          </div>
          <div className="loginsignup-fields">
            <img src={emailicon} alt="Email Icon" className="icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address'
              required
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
              minLength={10}
            />
          </div>
          <button type="submit">Sign up</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
        <p className="loginsignup-login">Already have an account? <span><Link to="/login">Login</Link></span></p>
      </div>
    </div>
  );
};

export default LoginSignup;
