import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = ({ scrollToNewCollections, scrollTopopularproducts }) => {
  return (
    <div className='hero'>
      <div className="hero-latest-btn">
        <button className="button-52" onClick={scrollToNewCollections}>NEW COLLECTIONS</button>
        <Link to={"/ProductList"}>
          <button className="button-52">DISCOVER</button>
        </Link>
        <button className="button-52" onClick={scrollTopopularproducts}>POPULAR PRODUCTS</button>
      </div>
    </div>
  );
};

export default Hero;
