import React, { useState, useEffect } from 'react';
import axios from 'axios';
import unfavoriteHeart from '../Assets/heart.png';
import favoriteHeart from '../Assets/heartfilled.png';
import './FavoriteButton.css';

const FavoriteButton = ({ productId, userId }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const response = await axios.get('/api/favorite', {
                    params: { productId, userId }
                });
                setIsFavorite(response.data.isFavorite);
            } catch (error) {
                console.error('Failed to fetch favorite status', error);
            }
        };

        fetchFavoriteStatus();
    }, [productId, userId]);

    const toggleFavorite = async () => {
        const newFavoriteState = !isFavorite;
    
        console.log('New favorite state:', newFavoriteState);
    
        setIsFavorite(newFavoriteState); // Update UI immediately
        setIsAnimating(true); // Add animation class
    
        try {
            await axios.post('/api/favorite/toggle', {
                productId,
                userId,
                isFavorite: newFavoriteState
            });
        } catch (error) {
            console.error('Failed to toggle favorite status', error);
            // Revert UI state if API call fails
            setIsFavorite(!newFavoriteState);
        } finally {
            setIsAnimating(false); // Remove animation class
        }
    };
    

    return (
        <img
            src={isHovered || isFavorite ? favoriteHeart : unfavoriteHeart}
            alt={isFavorite ? 'Unfavorite' : 'Favorite'}
            onClick={toggleFavorite}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`heart-icon ${isAnimating ? 'pop' : ''}`}
        />
    );
};

export default FavoriteButton;
