import React from 'react';
import './Userdashboard.css';
import Logout from '../Logout/Logout'



const Userdashboard = () => {




  return (
    <div className="userdashboard-container">
      <div className="userdashboard-sidebar">
      <h2><a href="/Userdashboard">Dashboard</a></h2>
        <ul>
          <li>
            <a href="/Myorders">
            My Orders
            </a>
          </li>
          
        </ul>
        <Logout/>
      </div>
      <div className="userdashboard-main-content">
            <h2>HELLO </h2>
            
            <div className='userdashbcontainers'>
         
         
            </div>
            
      </div>
    </div>
  );
};

export default Userdashboard;
