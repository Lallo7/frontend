import React, { useState, useEffect } from 'react';
import './Popular.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config'; 
import Rating from '../Rating/Rating';  // Make sure this is the correct path
import FavoriteButton from '../FavoriteButton/FavoriteButton';  // Make sure this is the correct path

const getBearerTokenFromCookies = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const Popular = ({ popularProducts }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (popularProducts && popularProducts.length > 0) {
      setProducts(popularProducts);
    } else {
      fetch(`${BASE_URL}api/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
        },
      })
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching popular products:', error));
    }
  }, [popularProducts]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className='popular'>
      <h1>POPULAR PRODUCTS</h1>
      <hr />
      <div className="popular-item">
        {products.length > 0 ? (
          products.map(product => (
            <div className="popular-product-card" key={product.id}>
              <div className='productimg'>
                <img
                  src={product.imageURL}
                  alt={product.name}
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: 'pointer' }} // Indicate clickable image
                />
              </div>
              <div className="popular-product-details">
                <h3>{product.name}</h3>
                <p><span style={{ fontWeight: "bold" }}>Brand: </span>{product.brand}</p>
                <p><span style={{ fontWeight: "bold" }}>Category: </span>{product.category}</p>
                <p><span style={{ fontWeight: "bold" }}>Concentration: </span>{product.concentration}</p>
                <p><span style={{ fontWeight: "bold" }}>Description: </span>{product.description}</p>
                <br />
                <span style={{ fontWeight: "bold" }}>Price: </span><span style={{ fontWeight: "bolder" }}>{product.price} DZD</span>
                <div className="rating-favorite-container">
                  <div className="Rating-container">
                    <Rating defaultValue={product.rating} />
                  </div>
                  <div className="Heart-container">
                    <FavoriteButton productId={product.id} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Popular;
