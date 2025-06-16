import React, { useEffect, useState } from 'react';
import { fetchClientRentals, fetchClientPurchases } from '../services/api.js';

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
        <div>
            <h2>My Rentals & Purchases</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h3>My Rentals</h3>
                <ul>
                    {rentals.map((rental) => (
                        <li key={rental.id}>
                            {rental.bookTitle} — Rented on {rental.startDate}, due {rental.dueDate}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>My Purchases</h3>
                <ul>
                    {purchases.map((purchase) => (
                        <li key={purchase.id} value={purchase.id}>
                            {purchase.bookTitle} — Purchased on {purchase.purchaseDate}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MyHistory;
