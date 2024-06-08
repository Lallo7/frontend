import React, { useState } from 'react';
import selectedStarImage from '../Assets/star.png'; // Import your selected star image
import unselectedStarImage from '../Assets/starfilled.png'; // Import your unselected star image
import './Rating.css'; // Import CSS file for styling

const Rating = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || 0);
  const [hoverValue, setHoverValue] = useState(0);

  const handleMouseEnter = newValue => {
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleClick = newValue => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="rating-container">
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          src={index < (hoverValue || value) ? unselectedStarImage : selectedStarImage}
          alt={index < (hoverValue || value) ? 'selected star' : 'unselected star'}
          onClick={() => handleClick(index + 1)}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          className="star-image"
        />
      ))}
    </div>
  );
};

export default Rating;
