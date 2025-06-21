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
                setError('❌ Failed to load active rentals.');
            }
        };

        loadRentals();
    }, [clientId]);

    const handleExtend = async (rentalId) => {
        setMessage('');
        setError('');

        try {
            const responseMessage = await extendRental(rentalId);
            setMessage('✅ Rental extended successfully.');

            // Atualiza localmente o dueDate para refletir os +14 dias
            setRentals((prevRentals) =>
                prevRentals.map((rental) =>
                    rental.rentalId === rentalId
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
            setError('❌ Failed to extend rental.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
                    ⏳ Extend Book Rental
                </h2>

                {message && (
                    <div className="mb-6 text-green-700 dark:text-green-400 text-center font-medium">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-6 text-red-600 dark:text-red-400 text-center font-medium">
                        {error}
                    </div>
                )}

                {rentals.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        You have no active rentals to extend.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {rentals.map((rental) => (
                            <div
                                key={rental.rentalId}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 flex flex-col justify-between"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    {rental.bookTitle}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Due Date: {new Date(rental.dueDate).toLocaleDateString()}
                                </p>
                                <button
                                    onClick={() => handleExtend(rental.rentalId)}
                                    className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                                >
                                    Extend Rental
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-10">
                    <HomeButton />
                </div>
            </div>
        </div>
    );
};

export default ExtendRentalPage;
