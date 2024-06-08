import React, { useEffect, useState } from 'react';
import useUserData from '../../renderinglogic/useUserData';

const Favorite = () => {
    const { userData, isLoading: userLoading, error: userError } = useUserData();
    const [favorites, setFavorites] = useState([]);
    const [favoritesLoading, setFavoritesLoading] = useState(true);
    const [favoritesError, setFavoritesError] = useState(null);

    useEffect(() => {
        if (userData) {
            const fetchFavorites = async () => {
                try {
                    const response = await fetch(`http://your-laravel-backend.com/api/favorites/${userData.username}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch favorite products');
                    }

                    const data = await response.json();
                    setFavorites(data);
                } catch (error) {
                    setFavoritesError(error.message);
                } finally {
                    setFavoritesLoading(false);
                }
            };

            fetchFavorites();
        }
    }, [userData]);

    if (userLoading || favoritesLoading) return <div>Loading...</div>;
    if (userError) return <div>Error: {userError}</div>;
    if (favoritesError) return <div>Error: {favoritesError}</div>;

    return (
        <div>
            <h1>Favorite Products</h1>
            <ul>
                {favorites.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Favorite;
