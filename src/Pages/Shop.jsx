import React, { useRef, useState, useEffect } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import './CSS/Shop.css'
import Concentration from '../Components/Concentrationguide/Concentration';

const Shop = () => {
  const newCollectionsRef = useRef(null);
  const popularproductsRef = useRef(null);
  
  const scrollToNewCollections = () => {
    newCollectionsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollTopopularproducts = () => {
    popularproductsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [popularProducts, setPopularProducts] = useState([]);
  const [newCollectionsProducts, setNewCollectionsProducts] = useState([]);

  useEffect(() => {
    // Fetch popular products from the database
    fetch('/api/popular-products')
      .then(response => response.json())
      .then(data => setPopularProducts(data))
      .catch(error => console.error('Error fetching popular products:', error));

    // Fetch new collections products from the database
    fetch('/api/new-collections-products')
      .then(response => response.json())
      .then(data => setNewCollectionsProducts(data))
      .catch(error => console.error('Error fetching new collections products:', error));
  }, []);

  return (
    <div>
      <Hero scrollToNewCollections={scrollToNewCollections} scrollTopopularproducts={scrollTopopularproducts} />
      <Concentration/>
      <div ref={popularproductsRef}>
        <Popular popularProducts={popularProducts} />
      </div>
      <div ref={newCollectionsRef}>
        <NewCollections newCollectionsProducts={newCollectionsProducts} />
      </div>
      <NewsLetter />
    </div>
  );
};

export default Shop;
