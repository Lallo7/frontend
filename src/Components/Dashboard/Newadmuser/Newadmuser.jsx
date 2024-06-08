import React, { useState, useEffect } from 'react';
import './Newadmuser.css';
import { BASE_URL, getBearerTokenFromCookies } from '../../../config';
import Logout from '../../Logout/Logout';

const ITEMS_PER_PAGE = 6;

const Newadmuser = () => {
  const [username, setUsername] = useState('');
  const [accountemail, setAccountemail] = useState('');
  const [accountpassword, setAccountpassword] = useState('');
  const [activeForm, setActiveForm] = useState(null);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageAdmins, setCurrentPageAdmins] = useState(1);

  useEffect(() => {
    fetchUsers();
    fetchAdmins();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}api/user`, {
        headers: {
          'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
      } else {
        setError('Failed to fetch users. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}api/admin`, {
        headers: {
          'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (response.ok) {
        const adminData = await response.json();
        setAdmins(adminData);
      } else {
        setError('Failed to fetch admins. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let errorTimeout;
    if (error) {
      setShowError(true);
      errorTimeout = setTimeout(() => {
        setShowError(false);
        setError('');
      }, 3000);
    }
    return () => clearTimeout(errorTimeout);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}api/users/${activeForm}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
        },
        body: JSON.stringify({
          email: accountemail,
          password: accountpassword,
          name: username,
          role: activeForm === 'user' ? 'user' : 'admin'
        }),
      });

      if (response.ok) {
        console.log(`${activeForm} added successfully`);
        setUsername('');
        setAccountemail('');
        setAccountpassword('');
        setActiveForm(null);
        if (activeForm === 'user') {
          fetchUsers();
        } else {
          fetchAdmins();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || `Failed to add ${activeForm}`);
      }
    } catch (error) {
      console.error(`Error adding ${activeForm}:`, error);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  // hi
  const handleRemoveUser = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        setError('Failed to remove user. Please try again later.');
      }
    } catch (error) {
      console.error('Error removing user:', error);
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  const handleRemoveAdmin = async (adminId) => {
    try {
      const response = await fetch(`${BASE_URL}api/admins/${adminId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (response.ok) {
        setAdmins(admins.filter(admin => admin.id !== adminId));
      } else {
        setError('Failed to remove admin. Please try again later.');
      }
    } catch (error) {
      console.error('Error removing admin:', error);
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  const paginateUsers = (users) => {
    const startIndex = (currentPageUsers - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return users.slice(startIndex, endIndex);
  };

  const paginateAdmins = (admins) => {
    const startIndex = (currentPageAdmins - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return admins.slice(startIndex, endIndex);
  };

  return (
    <div className="newadmuser-container">
      <div className="newadmuser-sidebar">
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
      <div className="newadmuser-main-content">
        <div className="users-section">
          <h2>Users</h2>
          <div className="add-button-container">
            <button className="add-button" onClick={() => setActiveForm('user')}>+ Add User</button>
          </div>
          <div className="addadmusercard-container">
            {loading ? (
              <p>Loading users...</p>
            ) : (
              paginateUsers(users).map(user => (
                <div className="addadmusercard" key={user.id}>
                  <h3>{user.name}</h3>
                  <p>Email: {user.email}</p>
                  <button className="userremove-button" onClick={() => handleRemoveUser(user.id)}>Remove</button>
                </div>
              ))
            )}
          </div>
          <div className="pagination">
            <button onClick={() => setCurrentPageUsers(currentPageUsers - 1)} disabled={currentPageUsers === 1}>Previous</button>
            <span>Page {currentPageUsers}</span>
            <button onClick={() => setCurrentPageUsers(currentPageUsers + 1)} disabled={currentPageUsers * ITEMS_PER_PAGE >= users.length}>Next</button>
          </div>
        </div>
        <div className="admins-section">
          <h2>Admins</h2>
          <div className="add-button-container">
            <button className="add-button" onClick={() => setActiveForm('admin')}>+ Add Admin</button>
          </div>
          <div className="addadmusercard-container">
            {loading ? (
              <p>Loading admins...</p>
            ) : (
              paginateAdmins(admins).map(admin => (
                <div className="addadmusercard" key={admin.id}>
                  <h3>{admin.name}</h3>
                  <p>Email: {admin.email}</p>
                  <button className="userremove-button" onClick={() => handleRemoveAdmin(admin.id)}>Remove</button>
                </div>
              ))
            )}
          </div>
          <div className="pagination">
            <button onClick={() => setCurrentPageAdmins(currentPageAdmins - 1)} disabled={currentPageAdmins === 1}>Previous</button>
            <span>Page {currentPageAdmins}</span>
            <button onClick={() => setCurrentPageAdmins(currentPageAdmins + 1)} disabled={currentPageAdmins * ITEMS_PER_PAGE >= admins.length}>Next</button>
          </div>
        </div>
      </div>
      {activeForm && (
        <div className={`addadmuser-form-container ${activeForm ? 'active' : ''}`}>
          <form onSubmit={handleSubmit} className={`addadmuserform form ${activeForm ? 'active' : ''}`}>
            <button
              type="button"
              className="exit-button"
              onClick={() => setActiveForm(null)}
            >
              X
            </button>
            <label htmlFor="username">Username</label> <br />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /> <br />
            <label htmlFor="accountemail">Email</label> <br />
            <input
              type="email"
              placeholder="user@example.com"
              value={accountemail}
              onChange={(e) => setAccountemail(e.target.value)}
              required
            /> <br />
            <label htmlFor="accountpassword">Password</label> <br />
            <input
              type="password"
              placeholder="Password (minimum 10 characters)"
              value={accountpassword}
              onChange={(e) => setAccountpassword(e.target.value)}
              minLength={10}
              required
            /> <br />
            <button type="submit">{activeForm === 'user' ? 'Add User' : 'Add Admin'}</button>
          </form>
        </div>
      )}

      {showError && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Newadmuser;
