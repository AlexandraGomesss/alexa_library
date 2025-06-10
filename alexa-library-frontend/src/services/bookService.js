import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books';

// Create an Axios instance with default auth credentials
const api = axios.create({
    auth: {
        username: 'admin',
        password: 'admin123'
    }
});

export const getAvailableBooks = async () => {
    try {
        const response = await api.get(`${API_URL}/available`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // Re-throw the error so components can handle it
    }
};