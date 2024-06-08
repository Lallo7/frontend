// src/components/RelatedProducts.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../config';
import './RelatedProducts.css';

const RelatedProducts = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      fetch(`${BASE_URL}api/products?category=${category}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
        },
      })
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching related products:', error));
    }
  }, [category]);

  function getBearerTokenFromCookies() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === 'auth_token') {
        return `Bearer ${value}`;
      }
    }
    return null;
  }

  const handleProductClick = (product) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='relatedproducts'>
      <div className="category-heading">
        <hr />  
        <h1>RELATED PRODUCTS</h1>
        <hr />
      </div>
      <div className="relatedproducts-item">
        {products.slice(0, 6).map(product => (
          <div key={product.id} className="product-item">
            <Link to={`/product/${product.id}`} onClick={() => handleProductClick(product)}>
              <img src={product.imageURL} alt={product.name} />
            </Link>
            <h2>{product.name}</h2>
            <p>{product.concentration}</p>
            <p>{product.price} DZD</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
