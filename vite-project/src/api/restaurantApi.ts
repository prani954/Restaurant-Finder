const API_BASE_URL = '/api';

export const getRestaurants = async () => {
    const response = await fetch(`${API_BASE_URL}/restaurants`);
    return response.json();
};

// Change the id parameter type to string
export const getRestaurantById = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/restaurant/${id}`);
    return response.json();
};
