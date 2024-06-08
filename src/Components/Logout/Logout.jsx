import React from 'react';
import axios from 'axios';
import './Logout.css';
import { BASE_URL, getBearerTokenFromCookies } from '../../config';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const token = getBearerTokenFromCookies();

      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': token,
      };

      const response = await axios.get(`${BASE_URL}api/logout`, { headers });

      console.log(response.data); 
      
      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .trim()
          .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
      });

      // Redirect to login page
      window.location.href = '/login';  // Use href to navigate to login
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='logoutbutton'>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
