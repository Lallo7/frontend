import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import market from '../Assets/market.png';
import './ProductDisplay.css';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1); // Initialize the quantity state with a default value of 1

  if (!product) return <div>Loading...</div>;

  // Function to handle the increase in quantity
  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Function to handle the decrease in quantity
  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.imageURL} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1><br />
        <p>Brand: {product.brand}</p><br />
        <p>Category: {product.category}</p><br />
        <p>Concentration: {product.concentration}</p><br />
        <p>Description: {product.description}</p><br />
        <p style={{ fontWeight: "bold" }}>Price: {product.price} DZD</p>

        <div className="quantity-control">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>

        <button onClick={() => addToCart(product.id, quantity)}>
          <img src={market} alt="" style={{ width: "20px" }} /> ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
