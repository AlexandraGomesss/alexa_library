// src/services/purchaseService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/purchases';

export const createPurchase = async (clientId, bookId, quantity) => {
    const response = await axios.post(API_URL, {
        clientId,
        bookId,
        quantity
    });
    return response.data;
};
