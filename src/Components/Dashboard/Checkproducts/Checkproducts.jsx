import React, { useState, useEffect } from 'react';
import './Checkproducts.css';
import Logout from '../../Logout/Logout';
import { BASE_URL,getBearerTokenFromCookies } from '../../../config';

const Checkproducts = () => {
  const [products, setProducts] = useState([]);
  const [noProducts, setNoProducts] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/products`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          setProducts(data);
        } else {
          setNoProducts(true);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      // Remove product from state
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
      setError('Failed to remove product. Please try again later.');
    }
  };

  const paginateProducts = (products) => {
    const startIndex = (currentPage - 1) * 5; 
    const endIndex = startIndex + 5;
    return products.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(products.length / 5); 

  return (
    <div className="products-container">
      <div className="products-sidebar">
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
      <div className="products-main-content">
        <h2>CHECK PRODUCTS</h2>
        {error ? (
          <p>Error: {error}</p>
        ) : noProducts ? (
          <p>No products found.</p>
        ) : (
          <>
            <div className="products-content">
              {paginateProducts(products).map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>Brand: {product.brand}</p>
                  <p>Concentration: {product.concentration}</p>
                  <p>Quantity: {product.quantity}</p>
                  <div className='removebutton' onClick={() => handleRemoveProduct(product.id)}>Remove</div> 
                </div>
              ))}
            </div>
          </>
        )}
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkproducts;
