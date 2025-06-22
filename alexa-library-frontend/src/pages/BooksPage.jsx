import React, { useEffect, useState } from 'react';
import { getAvailableBooks } from '../services/bookService';
import { HomeButton } from "../components/HomeButton";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAvailableBooks()
            .then(data => setBooks(data))
            .catch(error => console.error('⛔ Error fetching books:', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
                    📔 Available Books
                </h2>

                {loading ? (
                    <p className="text-center text-gray-600 dark:text-gray-400 text-lg">Loading books...</p>
                ) : books.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400 text-lg">No books available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map(book => (
                            <div
                                key={book.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                            >
                                <img
                                    src={book.coverURL || 'https://via.placeholder.com/300x400?text=No+Cover'}
                                    alt={book.title}
                                    className="w-full h-96 object-fit"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-auto">
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
        </div>
    );
};

export default BooksPage;
