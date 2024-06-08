import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/market.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import searchicon from '../Assets/search.png';
import { getBearerTokenFromCookies } from '../../config';
import axios from 'axios';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(null);
  const { totalCartItems, fetchTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTotalCartItems(); // Fetch total cart items when component mounts
  }, [fetchTotalCartItems]); // Add fetchTotalCartItems to dependency array to ensure it's called only once

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchError(null);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setSearchError(null);

    try {
      const response = await axios.post('/api/search', { query: searchQuery });

      if (response.status === 200) {
        navigate('/productList', { state: response.data });
      } else {
        console.error('Search failed:', response.data);
        setSearchError('An error occurred while processing your search.');
      }
    } catch (error) {
      console.error('Error during search:', error);
      setSearchError('Failed to connect to the server');
    }
  };

  const isUserLoggedIn = getBearerTokenFromCookies();

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => setMenu("shop")} className="nav-logo">
        <img src={logo} alt="Logo" />
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="Dropdown menu" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
        <li onClick={() => setMenu("men")}><Link to='/category/men'>Men</Link>{menu === "men" ? <hr /> : null}</li>
        <li onClick={() => setMenu("women")}><Link to='/category/women'>Women</Link>{menu === "women" ? <hr /> : null}</li>
        {isUserLoggedIn && (
          <li onClick={() => setMenu("Favorite")}><Link to='/category/favorite'>Favorite</Link>{menu === "Favorite" ? <hr /> : null}</li>
        )}
      </ul>
      <form onSubmit={handleSearchSubmit} className="nav-search">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="nav-search-input"
        />
        <button type="submit" className="nav-search-button">
          <img src={searchicon} alt="Search" />
        </button>
        {searchError && <p className="search-error">{searchError}</p>}
      </form>
      <div className="nav-login-cart">
        <Link to={isUserLoggedIn ? '/Userdashboard' : '/Login'}>
          <button className="button-52">{isUserLoggedIn ? 'Profile' : 'Login'}</button>
        </Link>
        <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>
        <div className="nav-cart-count">{totalCartItems}</div>
      </div>
    </div>
  );
};

export default Navbar;
