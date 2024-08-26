import React from 'react';
// import { Link } from 'react-router-dom';

interface RestaurantCardProps {
    id: string;
    name: string;
    image: string;
    address: string;
    cuisines: string;
    averageCost: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ id, name, image, address, cuisines, averageCost }) => {
    return (
        <div className="restaurant-card">
            <img src={image || 'default-image-url'} alt={name} className="restaurant-card__image" />
            <div className="restaurant-card__content">
                <h2 className="restaurant-card__title">{name}</h2>
                <p className="restaurant-card__address">{address}</p>
                <p className="restaurant-card__cuisines">Cuisines: {cuisines}</p>
                <p className="restaurant-card__average-cost">Average Cost for Two: Rs. {averageCost}</p>
{/*                 <Link to={`/restaurant/${id}`} className="restaurant-card__link">View Details</Link> */}
                <a
                    href={`/restaurant/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="restaurant-card__link"
                >
                    View Details
                </a>
            </div>
        </div>
    );
};

export default RestaurantCard;
