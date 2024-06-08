import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state;

  return (
    <div className="search-results-container">
      <div className="new-collections">
        <h1>Search Results</h1>
        <hr />
      </div>
      {searchResults && searchResults.length > 0 ? (
        <ul className="collections">
          {searchResults.map((result) => (
            <li key={result.id} className="search-result-item">
              <div className="search-result-image">
                <img src={result.imageUrl} alt={result.name} />
              </div>
              <div className="search-result-details">
                <h3>{result.name}</h3>
                <p>{result.brand}</p>
                <p>Price: ${result.price}</p>
                <p>Category: ${result.category}</p>
                <p>Concentration: ${result.concentration}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-results">No search results found.</p>
      )}
    </div>
  );
};

export default SearchResults;