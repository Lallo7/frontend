import React, { useState, useEffect } from 'react';
import './Validorders.css';
import Dashboardicon from '../../Assets/dashboard.png';
import Logout from '../../Logout/Logout';

const Validorders = () => {
  const [validOrders, setValidOrders] = useState([]);
  const [noValidOrders, setNoValidOrders] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValidOrders = async () => {
      try {
        const response = await fetch('/api/Validorders');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          setValidOrders(data);
        } else {
          setNoValidOrders(true);
        }
      } catch (error) {
        console.error('Error fetching valid orders:', error);
        setError('Failed to fetch Validorders. Please try again later.');
      }
    };

    fetchValidOrders();
  }, []);

  const handleRemoveOrder = async (orderId) => {
    try {
      // Implement removal logic here, such as sending a request to your server to delete the order
      console.log(`Removing order with ID ${orderId}`);
      // Example of removing the order from the local state
      setValidOrders(validOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error removing order:', error);
    }
  };

  function logout(){
    
  }

  return (
    <div className="Validorders-container">
      <div className="Validorders-sidebar">
        <h2><a href="/">Dashboard</a></h2>
        <ul>
        <li><a href="/Addproduct">Add Product</a></li>
          <li><a href="/Checkproducts">Checkout Products</a></li>
          <li><a href="/CheckOrders">Check Orders</a></li>
          <li><a href="/Validorders">Valid Orders</a></li>
          <li><a href="/Newadmuser">Users/Admins</a></li>
        </ul>
        <Logout/>
      </div>
      <div className="Validorders-main-content">
        <h2>VALID ORDERS</h2>

        {error ? (
          <p>Error: {error}</p>
        ) : noValidOrders ? (
          <p>No Valid orders found.</p>
        ) : (
          validOrders.map((validOrder) => (
            <div key={validOrder.id} className="Validorder-card">
              <p>Product: {validOrder.product.name}</p>
              <p>Quantity: {validOrder.quantity}</p>
              <p>Total: {validOrder.total}</p>
              <button onClick={() => handleRemoveOrder(validOrder.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Validorders;
