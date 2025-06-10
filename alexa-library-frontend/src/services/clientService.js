import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clients';

// Create an Axios instance with default auth credentials
const api = axios.create({
    auth: {
        username: 'admin',
        password: 'admin123'
    }
});

export const getClientById = async (clientId) => {
    const response = await axios.get(`${API_URL}/${clientId}`, {
        auth: {
            username: 'admin',
            password: 'admin123'
        }
    });
    return response.data;
};