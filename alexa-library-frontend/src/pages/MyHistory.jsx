import React, { useEffect, useState } from 'react';
import { fetchClientRentals, fetchClientPurchases } from '../services/api.js';
import { HomeButton } from '../components/HomeButton';

function MyHistory() {
    const [rentals, setRentals] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const clientId = localStorage.getItem('clientId');

        if (!clientId) {
            setError('You must be logged in to view history.');
            return;
        }

        const fetchData = async () => {
            try {
                const rentalData = await fetchClientRentals(clientId);
                const purchaseData = await fetchClientPurchases(clientId);
                setRentals(rentalData);
                setPurchases(purchaseData);
                setError('');
            } catch (err) {
                setError('Failed to fetch data. Make sure the client ID is correct.');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 text-center mb-8">
                    📁 My Rentals & Purchases
                </h2>

                {error && (
                    <p className="text-red-600 dark:text-red-400 text-center mb-6">{error}</p>
                )}

                <div className="mb-10">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">📚 Rentals</h3>
                    {rentals.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">You haven’t rented any books yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {rentals.map((rental) => (
                                <div
                                    key={rental.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                                >
                                    <img
                                        src={rental.bookCoverUrl || 'https://via.placeholder.com/300x400?text=No+Cover'}
                                        alt={rental.bookTitle}
                                        className="w-full h-96 object-fit"
                                    />
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                                            {rental.bookTitle}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Rented on: {rental.startDate}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Due: {rental.dueDate}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mb-10">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">🛒 Purchases</h3>
                    {purchases.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">You haven’t purchased any books yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {purchases.map((purchase) => (
                                <div
                                    key={purchase.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                                >
                                    <img
                                        src={purchase.bookCoverUrl || 'https://via.placeholder.com/300x400?text=No+Cover'}
                                        alt={purchase.bookTitle}
                                        className="w-full h-96 object-fit"
                                    />
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                                            {purchase.bookTitle}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Purchased on: {purchase.purchaseDate}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8 flex justify-center">
                    <HomeButton />
                </div>
            </div>
        </div>
    );
}

export default MyHistory;
