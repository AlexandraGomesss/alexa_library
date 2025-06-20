import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    auth: {
        username: 'admin',
        password: 'admin123'
    }
});

export async function createPurchase(clientId, bookId, quantity) {
    try {
        const response = await api.post('/purchases', {
            clientId,
            bookId,
            quantity,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Unknown error" };
    }
}
