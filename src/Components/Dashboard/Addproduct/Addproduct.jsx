import React, { useState, useEffect } from 'react';
import './Addproduct.css';
import axios from 'axios';
import Logout from '../../Logout/Logout';
import { BASE_URL, getBearerTokenFromCookies } from '../../../config';

const Addproduct = () => {
  const [productBrand, setProductBrand] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productConcentration, setProductConcentration] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [fileName, setFileName] = useState('');

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('brand', productBrand);
      formData.append('name', productName);
      formData.append('price', parseFloat(productPrice));
      formData.append('category', productCategory);
      formData.append('concentration', productConcentration);
      formData.append('description', productDescription);
      formData.append('image', productImage);

      const response = await axios.post(`${BASE_URL}api/products`, formData, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Authorization': getBearerTokenFromCookies(),
        },
      });

      console.log(response.data);

      setProductBrand('');
      setProductName('');
      setProductPrice('');
      setProductCategory('');
      setProductConcentration('');
      setProductDescription('');
      setProductImage(null);
      setFileName('');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="addproduct-container">
      <div className="addproduct-sidebar">
        <h2><a href="/">Dashboard</a></h2>
        <ul>
          <li><a href="/Addproduct">Add Product</a></li>
          <li><a href="/Checkproducts">Checkout Products</a></li>
          <li><a href="/CheckOrders">Check Orders</a></li>
          <li><a href="/Validorders">Valid Orders</a></li>
          <li><a href="/Newadmuser">Users/Admins</a></li>
        </ul>
        <Logout />
      </div>
      <div className="addproduct-main-content">
        <h2>ADD PRODUCT</h2>
        <div className="addp-checkout-form">
          {showError && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="addp-form-row">
              <div className="addp-form-group">
                <label htmlFor="productBrand" className="inputslabels">Brand</label>
                <select
                  id="productBrand"
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  required
                >
                  <option value="">Select a brand</option>
                  <option value="Brand A">Brand A</option>
                  <option value="Brand B">Brand B</option>
                  <option value="Brand C">Brand C</option>
                </select>
              </div>
              <div className="addp-form-group">
                <label htmlFor="productName" className="inputslabels">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="addp-form-row">
              <div className="addp-form-group">
                <label htmlFor="productPrice" className="inputslabels">Price</label>
                <input
                  type="number"
                  id="productPrice"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </div>
              <div className="addp-form-group">
                <label htmlFor="productCategory" className="inputslabels">Category</label>
                <select
                  id="productCategory"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Category A">Category A</option>
                  <option value="Category B">Category B</option>
                  <option value="Category C">Category C</option>
                </select>
              </div>
            </div>
            <div className="addp-form-row">
              <div className="addp-form-group">
                <label htmlFor="productConcentration" className="inputslabels">Concentration</label>
                <input
                  type="text"
                  id="productConcentration"
                  value={productConcentration}
                  onChange={(e) => setProductConcentration(e.target.value)}
                  required
                />
              </div>
              <div className="addp-form-group">
                <label htmlFor="productImage" className="inputslabels">Image</label>
                <label htmlFor="productImage" className="file-input-label">
                  {fileName || 'Choose file'}
                </label>
                <input
                  type="file"
                  id="productImage"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="addp-form-group">
                <label htmlFor="productDescription" className="inputslabels">Description</label>
                <textarea
                  id="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="button-container">
              <button type="submit">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
