import React, { useState } from 'react';

const RestaurantSearch: React.FC = () => {
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [latitude, setLatitude] = useState<number | string>(0);
    const [longitude, setLongitude] = useState<number | string>(0);
    const [radius, setRadius] = useState<number>(3000); // Default 3 km
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            // Validate input values
            if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
                setError("Invalid latitude or longitude value");
                return;
            }

            // Call the API endpoint with the latitude, longitude, and radius
            const response = await fetch(`/api/nearby_restaurants?lat=${latitude}&lng=${longitude}&radius=${radius}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data); // Check the structure of the data in console
            setRestaurants(data || []); // Adjust based on API response
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            setError("Error fetching data");
        }
    };

    return (
        <div className="restaurant-search">
            <h2 id="res-list">Search Nearby Restaurants</h2>
            <div id="set">
            <label>
                <p>Latitude:</p>
                <input
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="search-input"
                />
            </label>
            <br />
            <label>
                <p>Longitude:</p>
                <input
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="search-input"
                />
            </label>
            </div>
            <br />
            <label>
                Radius (meters):
                <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(parseInt(e.target.value, 10))}
                    className="search-input"
                />
            </label>
            <br />
            <button onClick={handleSearch} className="search-button">Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {restaurants.length > 0 ? (
                    restaurants.map((restaurant: any) => (
                        <div key={restaurant.name} className="restaurant-item">
                            <h2>{restaurant.name}</h2>
                            <p>Address: {restaurant.address}</p>
                            <p>Latitude: {restaurant.latitude}</p>
                            <p>Longitude: {restaurant.longitude}</p>
                        </div>
                    ))
                ) : (
                    <p>No restaurants found</p>
                )}
            </div>
        </div>

    );
};

export default RestaurantSearch;
