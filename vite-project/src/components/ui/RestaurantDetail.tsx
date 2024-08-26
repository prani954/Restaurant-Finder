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
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '16px', 
          maxWidth: '400px', 
          margin: 'auto', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            color: '#333', 
            marginBottom: '12px' 
          }}>
            {restaurant.name}
          </h1>
          <img 
            src={restaurant.thumb || restaurant.featured_image} 
            alt={restaurant.name} 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '8px', 
              marginBottom: '12px' 
            }} 
          />
          <p style={{ 
            fontSize: '16px', 
            color: '#555', 
            marginBottom: '8px' 
          }}>
            <strong>Cuisines:</strong> {restaurant.cuisines}
          </p>
          <p style={{ 
            fontSize: '16px', 
            color: '#555', 
            marginBottom: '8px' 
          }}>
            <strong>Location:</strong> {restaurant.location?.address || 'No address available'}
          </p>
          <p style={{ 
            fontSize: '16px', 
            color: '#555', 
            marginBottom: '16px' 
          }}>
            <strong>Average Cost for Two:</strong> {restaurant.average_cost_for_two ? `Rs. ${restaurant.average_cost_for_two}` : 'Not available'}
          </p>
          <a 
            href={restaurant.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block', 
              padding: '10px 20px', 
              backgroundColor: '#007BFF', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '4px', 
              textAlign: 'center' 
            }}
          >
            For More Info Click Here
          </a>
        </div>
      );
      
};


export default RestaurantDetail;
