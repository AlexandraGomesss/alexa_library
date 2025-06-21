// src/services/rentService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    auth: {
        username: 'admin',
        password: 'admin123'
    }
});


export async function rentBook(clientId, bookId) {
    try {
        const response = await api.post('/rentals/rent', {
            clientId,
            bookId,
        });
        return response.data;
    } catch (error) {
        // Repasse o erro para o componente lidar
        throw error.response?.data || { message: "Unknown error" };
    }
}
