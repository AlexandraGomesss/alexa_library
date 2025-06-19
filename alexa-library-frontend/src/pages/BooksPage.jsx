import React, { useEffect, useState } from 'react';
import { getAvailableBooks } from '../services/bookService';
import { HomeButton } from "../components/HomeButton";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAvailableBooks()
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
                📚 Available Books
            </h2>

            {loading ? (
                <p className="text-center text-gray-500 text-lg">Loading books...</p>
            ) : books.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No books available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {books.map(book => (
                        <div
                            key={book.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                        >
                            <img
                                src={book.coverURL || 'https://via.placeholder.com/300x400?text=No+Cover'}
                                alt={book.title}
                                className="w-full h-70 h-fit object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    by {book.author}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-10 flex justify-center">
                <HomeButton />
            </div>
        </div>
    );
};

export default BooksPage;
