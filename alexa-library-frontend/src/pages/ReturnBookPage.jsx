import React, { useEffect, useState } from 'react';
import { fetchClientRentals, returnBook } from '../services/api';
import { HomeButton } from '../components/HomeButton';

const ReturnBookPage = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const clientId = localStorage.getItem('clientId');

    useEffect(() => {
        const loadRentals = async () => {
            try {
                const data = await fetchClientRentals(clientId);
                setRentals(data);
            } catch (err) {
                setError('Failed to load active rentals.');
            } finally {
                setLoading(false);
            }
        };

        loadRentals();
    }, [clientId]);

    const handleReturn = async (rentalId) => {
        setMessage('');
        setError('');
        try {
            await returnBook(rentalId);
            setMessage('Book returned successfully.');
            // Remove rental from list
            setRentals(prev => prev.filter(r => r.id !== rentalId));
        } catch (err) {
            setError('Failed to return the book.');
        }
    };

    if (loading) return <div>Loading active rentals...</div>;

    return (
        <div>
            <h2>Return a Book</h2>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {rentals.length === 0 ? (
                <p>No active rentals.</p>
            ) : (
                <ul>
                    {rentals.map((rental) => (
                        <li key={rental.id}>
                            <strong>{rental.bookTitle}</strong> – Due: {rental.dueDate}
                            <button
                                onClick={() => handleReturn(rental.rentalId)}
                                style={{ marginLeft: '10px' }}
                            >
                                Return
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <HomeButton />
        </div>
    );
};

export default ReturnBookPage;
