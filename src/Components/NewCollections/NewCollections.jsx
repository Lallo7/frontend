import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Product from '../../Pages/Product';  // Make sure this is the correct path
import { BASE_URL } from '../../config';
import Rating from '../Rating/Rating';  // Make sure this is the correct path
import FavoriteButton from '../FavoriteButton/FavoriteButton';  // Make sure this is the correct path

const getBearerTokenFromCookies = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const NewCollections = ({ newCollectionsProducts }) => {
  const [collections, setCollections] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (newCollectionsProducts && newCollectionsProducts.length > 0) {
      setCollections(newCollectionsProducts);
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
        .then(data => setCollections(data))
        .catch(error => console.error('Error fetching new collections:', error));
    }
  }, [newCollectionsProducts]);

  const handleProductClick = (product) => {
    setSelectedProduct(product); 
  };

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {collections.length > 0 ? (
          collections.map(product => (
            <div className="collection-product-card" key={product.id}>
              <div className='productimg'>
                <a href={`/product/${product.id}`} onClick={() => handleProductClick(product)}>
                  <img src={product.imageURL} alt={product.name} />
                </a>
              </div>
              <div className="collection-product-details">
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
      {selectedProduct && <Product product={selectedProduct} />} 
    </div>
  );
};

export default NewCollections;
