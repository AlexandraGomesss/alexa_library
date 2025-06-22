import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableBooks } from '../services/bookService';
import { createPurchase } from '../services/purchaseService';
import { HomeButton } from "../components/HomeButton";

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
                const filteredBooks = allBooks.filter(book =>
                    book.forSale && book.available && book.quantityAvailable > 0
                );
                setBooks(filteredBooks);
            } catch (error) {
                console.error('⛔ Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPurchase(clientId, selectedBookId, quantity);
            setMessage('👍 Purchase successful!');
        } catch (error) {
            console.error('⛔ Error making purchase:', error);
            setMessage('⛔ Purchase failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
                    🛒 Purchase a Book
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="book"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select Book
                        </label>
                        <select
                            id="book"
                            value={selectedBookId}
                            onChange={(e) => setSelectedBookId(e.target.value)}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        >
                            <option value="">-- Choose a book --</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title} by {book.author} — {book.price} €
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="quantity"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            max="99"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg
                        transition focus:outline-none focus:ring-4 focus:ring-blue-300
                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Purchase
                    </button>
                </form>

                {message && (
                    <div className={`mt-6 p-4 rounded-lg text-sm font-medium ${
                        message.includes('👍')
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    }`}>
                        {message}
                    </div>
                )}

                <div className="mt-6">
                    <HomeButton />
                </div>
            </div>
        </div>
    );
};

export default PurchasePage;
