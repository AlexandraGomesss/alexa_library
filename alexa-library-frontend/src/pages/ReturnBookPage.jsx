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
                setError('❌ Failed to load active rentals.');
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
            setMessage('✅ Book returned successfully.');
            setRentals((prev) => prev.filter((r) => r.rentalId !== rentalId));
        } catch (err) {
            setError('❌ Failed to return the book.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 dark:text-gray-300 text-xl">Loading active rentals...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
                    🔄 Return a Book
                </h2>

                {message && (
                    <div className="mb-4 text-green-700 dark:text-green-400 text-center font-medium">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 text-red-600 dark:text-red-400 text-center font-medium">
                        {error}
                    </div>
                )}

                {rentals.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">You have no active rentals.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {rentals.map((rental) => (
                            <div
                                key={rental.rentalId}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
                            >
                                <img
                                    src={rental.bookCoverUrl || 'https://via.placeholder.com/300x400?text=No+Cover'}
                                    alt={rental.bookTitle}
                                    className="w-full h-96 object-fit"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        {rental.bookTitle}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        Due: {rental.dueDate}
                                    </p>
                                    <button
                                        onClick={() => handleReturn(rental.rentalId)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                                    >
                                        Return Book
                                    </button>

                                </div>
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

export default ReturnBookPage;
