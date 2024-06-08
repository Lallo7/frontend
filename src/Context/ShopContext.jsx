import React, { createContext, useState, useEffect } from "react";
import { BASE_URL, getBearerTokenFromCookies } from "../config";

export const ShopContext = createContext(null);

const getDefaultCartItems = () => {
  return { items: [], total: 0};
};


const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCartItems());
    const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);

  const fetchTotalCartItems = () => {
    fetch(`${BASE_URL}api/cartCount`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
      },
    })
      .then(response => response.json())
      .then(data => setTotalCartItems(data.count))
      .catch(error => {
        console.error('Error fetching total cart items:', error);
        setTotalCartItems(0);
      });
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    fetch(`${BASE_URL}api/cart`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.items)) {
          setCartItems(data); // Set the entire data object
        } else {
          setCartItems(getDefaultCartItems()); // Set default if data.items is not an array
        }
      })
      .catch(error => console.error('Error fetching cart:', error));
  };
  

  const addToCart = (productId,productQt) => {
    fetch(`${BASE_URL}api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: productQt
    }),
    })
      .then(response => response.json())
      .then(updatedCartData => {
        setCartItems(updatedCartData);
      })
      .catch(error => console.error('Error adding to cart:', error));
  };

  const removeFromCart = (productId) => {
    fetch(`${BASE_URL}api/cart/${productId}/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${getBearerTokenFromCookies()}`,
      },
    })
      .then(response => response.json())
      .then(updatedCartData => {
        setCartItems(updatedCartData);
      })
      .catch(error => console.error('Error removing from cart:', error));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    totalCartAmount,
    totalCartItems,
    fetchTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
