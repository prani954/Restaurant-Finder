// const API_BASE_URL = 'https://restaurantfinder2.onrender.com/api';

// const API_BASE_URL = import.meta.env.VITE_API_URL

// export const getRestaurants = async () => {
//     const response = await fetch(`${API_BASE_URL}/api/restaurants`);
// const API_BASE_URL = '/api';

// export const getRestaurants = async () => {
//     const response = await fetch(`${API_BASE_URL}/restaurants`);
//     return response.json();
// };

// // Change the id parameter type to string
// export const getRestaurantById = async (id: string) => {
//     const response = await fetch(`${API_BASE_URL}/api/restaurant/${id}`);
//     return response.json();
// };
// import axios from 'axios';
// const API_BASE_URL = import.meta.env.VITE_API_URL;
// console.log(`${API_BASE_URL}/api/restaurants`)


// // const API_BASE_URL = import.meta.env.VITE_API_URL;

// export const getRestaurants = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/restaurants`);
//         console.log('Fetched restaurants data:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Failed to fetch restaurants:', error);
//         return [];
//     }
// };

// // Change the id parameter type to string
// export const getRestaurantById = async (id: string) => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/restaurant/${id}`);
//         console.log('Fetched restaurant data:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Failed to fetch restaurant:', error);
//         return null;
//     }
// };
//     const response = await fetch(`${API_BASE_URL}/restaurant/${id}`);
//     return response.json();
// };
import axios from 'axios';
const API_BASE_URL = '/api';  // Use the proxy URL

export const getRestaurants = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        return [];
    }
};

export const getRestaurantById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurant/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch restaurant:', error);
        return null;
    }
};

