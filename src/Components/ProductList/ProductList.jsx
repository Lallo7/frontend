import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { BASE_URL, getBearerTokenFromCookies } from '../../config';
import Product from '../../Pages/Product';
import Rating from '../../Components/Rating/Rating';
import FavoriteButton from '../../Components/FavoriteButton/FavoriteButton';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState({
    search: '',
    category: '',
    price: '',
    concentration: '',
    brand: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': getBearerTokenFromCookies(),
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched products:', data);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (filter.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    if (filter.category) {
      filtered = filtered.filter(product => product.category === filter.category);
    }

    if (filter.price) {
      filtered = filtered.sort((a, b) =>
        filter.price === 'highToLow' ? b.price - a.price : a.price - b.price
      );
    }

    if (filter.concentration) {
      filtered = filtered.filter(product => product.concentration === filter.concentration);
    }

    if (filter.brand) {
      filtered = filtered.filter(product => product.brand === filter.brand);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filter, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-list-container">
      <div className="sidebar-products-container">
        <div className="PLsidebar">
          <h3>Products</h3>
          <input
            type="text"
            placeholder="Search by name"
            name="search"
            value={filter.search}
            onChange={handleFilterChange}
          />
          <select name="category" value={filter.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
          <select name="price" value={filter.price} onChange={handleFilterChange}>
            <option value="">Sort by Price</option>
            <option value="highToLow">High to Low</option>
            <option value="lowToHigh">Low to High</option>
          </select>
          <select name="concentration" value={filter.concentration} onChange={handleFilterChange}>
            <option value="">All Concentrations</option>
            <option value="concentration1">Concentration 1</option>
            <option value="concentration2">Concentration 2</option>
          </select>
          <select name="brand" value={filter.brand} onChange={handleFilterChange}>
            <option value="">All Brands</option>
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
          </select>
        </div>
        <div className="product-cards-container">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <div className="allproduct-card" key={product.id}>
                <div className='productimg'>
                  <a href={`/product/${product.id}`} onClick={() => handleProductClick(product)}>
                    <img src={product.imageURL} alt={product.name} />
                  </a>
                  <hr style={{height:"1px ", backgroundColor:"black"}} />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p><span style={{ fontWeight: "bold" }}>Brand : </span>{product.brand}</p>

                  <p><span style={{ fontWeight: "bold" }}>Concentration : </span>{product.concentration}</p>
                  
                  <br />
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
        </div>
      </div>
      <div className="pagination-container">
        {filteredProducts.length > 0 && (
          <ul className="pagination">
            {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map((number) => (
              <li key={number + 1} className="pagination-button">
                <button onClick={() => paginate(number + 1)}>{number + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedProduct && <Product product={selectedProduct} />}
    </div>
  );
};

export default ProductList;
