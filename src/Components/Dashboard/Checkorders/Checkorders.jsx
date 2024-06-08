import React, { useState, useEffect } from 'react';
import './Checkorders.css';
import Logout from '../../Logout/Logout';

const CheckOrders = () => {
  const [orders, setOrders] = useState([]);
  const [noOrders, setNoOrders] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          setOrders(data);
        } else {
          setNoOrders(true);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    fetchOrders();
  }, []);

  const handleValidate = (orderId) => {
    // Implement validation logic here, for example, send a request to your server
    console.log(`Validating order with ID ${orderId}`);
  };
  function logout(){
    
  }

  return (
    <div className="orders-container">
      <div className="orders-sidebar">
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
      <div className="orders-main-content">
        <h2>CHECK ORDERS</h2>

        {error ? (
          <p>Error: {error}</p>
        ) : noOrders ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <p>Product: {order.product.name}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total: {order.total}</p>
              <button onClick={() => handleValidate(order.id)}>Validate</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckOrders;
