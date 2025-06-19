import React, { useEffect, useState } from 'react';
import { fetchClientRentals, extendRental } from '../services/api';
import { HomeButton } from '../components/HomeButton';

const ExtendRentalPage = () => {
    const [rentals, setRentals] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const clientId = localStorage.getItem('clientId');

    useEffect(() => {
        const loadRentals = async () => {
            try {
                const data = await fetchClientRentals(clientId);
                setRentals(data);
            } catch (err) {
                console.error('Failed to fetch rentals:', err);
                setError('Failed to load active rentals.');
            }
        };

        loadRentals();
    }, [clientId]);

    const handleExtend = async (rentalId) => {
        setMessage('');
        setError('');

        try {
            const responseMessage = await extendRental(rentalId);
            setMessage(responseMessage);

            // Atualiza localmente o dueDate para refletir os +14 dias
            setRentals((prevRentals) =>
                prevRentals.map((rental) =>
                    rental.id === rentalId
                        ? {
                            ...rental,
                            dueDate: new Date(
                                new Date(rental.dueDate).setDate(
                                    new Date(rental.dueDate).getDate() + 14
                                )
                            )
                                .toISOString()
                                .split('T')[0], // formata para yyyy-mm-dd
                        }
                        : rental
                )
            );
        } catch (err) {
            console.error('Error extending rental:', err);
            setError('Failed to extend rental.');
        }
    };

    return (
        <div>
            <h2>Extend Book Rental</h2>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {rentals.length === 0 ? (
                <p>No active rentals found.</p>
            ) : (
                <ul>
                    {rentals.map((rental) => (
                        <li key={rental.id}>
                            <strong>{rental.bookTitle}</strong> – Due:{' '}
                            {new Date(rental.dueDate).toLocaleDateString()}
                            <button
                                onClick={() => handleExtend(rental.id)}
                                style={{ marginLeft: '10px' }}
                            >
                                Extend
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <HomeButton />
        </div>
    );
};

export default ExtendRentalPage;
