import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create an Axios instance with default auth credentials
const api = axios.create({
    auth: {
        username: 'admin',
        password: 'admin123'
    }
});

export const fetchClientRentals = async (clientId) => {
    try {
        const response = await api.get(`${API_BASE_URL}/rentals/active/${clientId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching rentals:', error);
        throw error;
    }
};

export const fetchClientPurchases = async (clientId) => {
    try {
        const response = await api.get(`${API_BASE_URL}/purchases/client/${clientId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching purchases:', error);
        throw error;
    }
};
