import React from 'react';
import './CSS/Dashboard.css';
import usersicon from '../Components/Assets/user.png'
import totalincom from '../Components/Assets/totalincom.png'
import orders from '../Components/Assets/orders.png'
import products from '../Components/Assets/products.png'
import Logout from '../Components/Logout/Logout';



const Dashboard = () => {



  return (
    <div className="dashboard-container">
      <div className="sidebar">
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
      <div className="main-content">
            <h2>DASHBOARD</h2>
            
            <div className='dashbcontainers'>
         <div className="userscontainer">
            <img src={usersicon} alt="" />
         </div>
         <div className="productscontainer">
         <img src={products} alt="" />
         </div>
         <div className="orderscontainer">
         <img src={orders} alt="" />
         </div>
         <div className="totalincom">
         <img src={totalincom} alt="" />
         </div>
         
            </div>
            
            <div className='secondcont'>


            </div>
            
      </div>
    </div>
  );
};

export default Dashboard;
