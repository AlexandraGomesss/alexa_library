// src/pages/PurchasePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableBooks } from '../services/bookService';
import { createPurchase } from '../services/purchaseService';
import {HomeButton} from "../components/HomeButton";

const PurchasePage = () => {
    const clientId = localStorage.getItem('clientId');
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await getAvailableBooks();
                const filteredBooks = allBooks.filter(book => book.forSale && book.available && book.quantityAvailable > 0);
                setBooks(filteredBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPurchase(clientId, selectedBookId, quantity);
            setMessage('✅ Purchase successful!');
        } catch (error) {
            console.error('Error making purchase:', error);
            setMessage('❌ Purchase failed. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Purchase a Book</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Book:</label><br />
                    <select
                        value={selectedBookId}
                        onChange={(e) => setSelectedBookId(e.target.value)}
                        required
                    >
                        <option value="">-- Choose a book --</option>
                        {books.map(book => (
                            <option key={book.id} value={book.id}>
                                {book.title} by {book.author} — {book.price} €
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label>Quantity:</label><br />
                    <input
                        type="number"
                        min="1"
                        max="99"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required
                    />
                </div>

                <button type="submit" style={{ marginTop: '15px' }}>
                    Purchase
                </button>
            </form>

            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
            <HomeButton />
        </div>
    );
};

export default PurchasePage;
