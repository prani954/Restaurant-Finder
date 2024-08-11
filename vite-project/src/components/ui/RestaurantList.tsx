// import React, { useState, useEffect } from 'react';
// import { getRestaurants } from '@/api/restaurantApi';
// import RestaurantCard from '../ui/restaurantCard';
// import './RestaurantList.css'; // Add this line to import the CSS
// import '../ui/RestaurantSearch';
// import RestaurantSearch from '../ui/RestaurantSearch';


// const RestaurantList: React.FC = () => {
//     const [restaurants, setRestaurants] = useState<any[]>([]);

//     useEffect(() => {
//         async function fetchData() {
//             const data = await getRestaurants();
//             setRestaurants(data);
//         }
//         fetchData();
//     }, []);

//     return (
//         <div className="restaurant-list">
//             <h1>Restaurant List</h1>
//             <RestaurantSearch />
//             <div className="restaurant-list__grid">
//                 {restaurants.map((restaurant) => (
//                     <RestaurantCard
//                         key={restaurant.id}
//                         id={restaurant.id}
//                         name={restaurant.name}
//                         image={restaurant.thumb || restaurant.featured_image}
//                         address={restaurant.location?.address || 'No address available'}
//                         cuisines={restaurant.cuisines}
//                         averageCost={restaurant.average_cost_for_two}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RestaurantList;
import React, { useState, useEffect } from 'react';
import { getRestaurants } from '@/api/restaurantApi';
import RestaurantCard from '../ui/restaurantCard';
import './RestaurantList.css';
import RestaurantSearch from '../ui/RestaurantSearch';

const RestaurantList: React.FC = () => {
    const [restaurants, setRestaurants] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getRestaurants();
            setRestaurants(data);
        }
        fetchData();
    }, []);

    return (
        <div className="restaurant-list">
            <nav className="navbar">
                <h1>My Restaurant Finder</h1>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
            <h1 id="res-list">Restaurant List</h1>
            <RestaurantSearch />
            <div className="restaurant-list__grid">
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        id={restaurant.id}
                        name={restaurant.name}
                        image={restaurant.thumb || restaurant.featured_image}
                        address={restaurant.location?.address || 'No address available'}
                        cuisines={restaurant.cuisines}
                        averageCost={restaurant.average_cost_for_two}
                    />
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;

