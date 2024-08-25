// import axios from 'axios';
// const API_BASE_URL = '/api';  // Use the proxy URL

// export const getRestaurants = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/restaurants`);
//         return response.data;
//     } catch (error) {
//         console.error('Failed to fetch restaurants:', error);
//         return [];
//     }
// };

// export const getRestaurantById = async (id: string) => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/restaurant/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Failed to fetch restaurant:', error);
//         return null;
//     }
// };

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getRestaurants = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants`);
        console.log('Fetched restaurants data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        return [];
    }
};

export const getRestaurantById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurant/${id}`);
        console.log('Fetched restaurant data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch restaurant:', error);
        return null;
    }
};


