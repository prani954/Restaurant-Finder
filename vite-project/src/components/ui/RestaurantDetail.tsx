import React, { useState, useEffect } from 'react';
import { getRestaurantById } from '@/api/restaurantApi';
import { useParams } from 'react-router-dom';

const RestaurantDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                try {
                    const data = await getRestaurantById(id);
                    console.log(data);
                    setRestaurant(data);
                } catch (error) {
                    console.error('Error fetching restaurant data:', error);
                }
            }
        }
        fetchData();
    }, [id]);

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.url}</p>
            <p>Cuisines: {restaurant.cuisines}</p>
            <p>Location: {restaurant.location?.address || 'No address available'}</p>
            <p>Average Cost for Two: {restaurant.average_cost_for_two ? `Rs. ${restaurant.average_cost_for_two}` : 'Not available'}</p>
            <img src={restaurant.thumb || restaurant.featured_image} alt={restaurant.name} />
        </div>
    );
};

export default RestaurantDetail;
