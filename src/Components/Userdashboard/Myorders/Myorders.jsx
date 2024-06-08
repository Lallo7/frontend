// Myorders.js
import React, { useState, useEffect } from 'react';
import './Myorders.css';
import Logout from '../../Logout/Logout'


const Myorders = ({ username }) => {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`/api/user/orders?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user orders');
        }
        const data = await response.json();
        setUserOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user orders:', error);
        setIsLoading(false);
      }
    };

    fetchUserOrders();
  }, [username]); 

  
  const handleRemoveOrder = async orderId => {
    try {
      // Call API to remove the order
      await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      setUserOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error removing order:', error);
    }
  };

  

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
          <li>
            <a href="/Myvalidorders">
              My Valid Orders
            </a>
          </li>
        </ul>
        <Logout/>
      </div>
      
      <div className="userdashboard-main-content">
        <h2>My Orders</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="userdashbcontainers">
            {userOrders.map(order => (
              <div key={order.id} className="order-card">
                <p>Order ID: {order.id}</p>
                <p>Product: {order.product}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total: {order.total}</p>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Myorders;
