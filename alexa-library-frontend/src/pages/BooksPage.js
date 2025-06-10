import React, { useEffect, useState } from 'react';
import { getAvailableBooks } from '../services/bookService';

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
        <div>
            <h2>Available Books</h2>
            {loading ? (
                <p>Loading books...</p>
            ) : books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <ul>
                    {books.map(book => (
                        <li key={book.id}>
                            <strong>{book.title}</strong> by {book.author}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BooksPage;
