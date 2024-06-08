import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Addproduct from "../Components/Dashboard/Addproduct/Addproduct";
import Checkorders from "../Components/Dashboard/Checkorders/Checkorders";
import Checkproducts from "../Components/Dashboard/Checkproducts/Checkproducts";
import Validorders from '../Components/Dashboard/Validorders/Validorders';
import Newadmuser from "../Components/Dashboard/Newadmuser/Newadmuser";
import AdminLogin from "../Pages/AdminLogin"

import "../App.css";

function DashboardApp() {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<Dashboard />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Checkproducts" element={<Checkproducts />} />
        <Route path="/Checkorders" element={<Checkorders />} />
        <Route path="/Addproduct" element={<Addproduct />} />
        <Route path="/Validorders" element={<Validorders />} />
        <Route path="/Newadmuser" element={<Newadmuser/>} />
      </Routes>
    </div>
  );
}

export default DashboardApp;
