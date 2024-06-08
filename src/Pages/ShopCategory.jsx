import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CSS/ShopCategory.css';
import { BASE_URL } from '../config';
import Rating from '../Components/Rating/Rating';
import FavoriteButton from '../Components/FavoriteButton/FavoriteButton';
import Product from '../Pages/Product';

const getBearerTokenFromCookies = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const ShopCategory = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { category } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/products/categories/${category}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setCategoryProducts(data);
      } catch (error) {
        console.error('Error fetching category products:', error);
        setError(`Failed to load products. Please try again later. (${error.message})`);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='shop-category'>
      <div className="category-heading">
        <hr />
        <h1>{category.toUpperCase()} PRODUCTS</h1>
        <hr/>
      </div>
      <div className="shopcategory-indexSort"></div>
      <div className="shopcategory-products">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <div
                  className="scproduct-card"
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className='productimg'>
                    <img src={product.imageURL} alt={product.name} />
                    <hr style={{height:"1px ", backgroundColor:"black"}} />
                  </div>
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p><span style={{ fontWeight: "bold" }}>Brand : </span>{product.brand}</p>
                    <p><span style={{ fontWeight: "bold" }}>Concentration : </span>{product.concentration}</p>
                    <span style={{ fontWeight: "bold" }}>Price : </span><span style={{ fontWeight: "bolder" }}>{product.price} DZD</span>
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
          </>
        )}
      </div>
      {selectedProduct && <Product product={selectedProduct} />}
      <div className="scpagination-container">
        {categoryProducts.length > 0 && (
          <ul className="scpagination">
            {[...Array(Math.ceil(categoryProducts.length / productsPerPage)).keys()].map((number) => (
              <li key={number + 1} className="pagination-button">
                <button onClick={() => paginate(number + 1)}>{number + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
