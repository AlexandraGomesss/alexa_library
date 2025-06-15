import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getClientById } from '../services/clientService';

const HomePage = () => {
    const clientId = localStorage.getItem('clientId');
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleExit = () => {
        // Clear all client-related data from storage
        localStorage.removeItem('clientId');
        localStorage.removeItem('clientName');
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/login');

        // Optional: Show logout confirmation
        alert('You have been logged out successfully. Goodbye!');
    };

    useEffect(() => {
        const fetchClientData = async () => {
            if (clientId) {
                try {
                    const clientData = await getClientById(clientId);
                    setClient(clientData);
                    // Store name for later use if needed
                    localStorage.setItem('clientName', clientData.name);
                } catch (error) {
                    console.error('Error loading client data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchClientData();
    }, [clientId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Welcome, {client ? client.name : `Client #${clientId}`}</h2>
            <p>What would you like to do?</p>
            <ul>
                <li><Link to="/books">View available books</Link></li>
                <li><Link to="/rent">Rent a book</Link></li>
                <li><Link to="/purchase">Purchase a book</Link></li>
                <li><Link to="/my-library">View my rentals/purchases</Link></li>
                <li><Link to="/return-book">Return a book</Link></li>
                <li><Link to="/extend-rental">Extend a rental</Link></li>
                {/* Changed from Link to button */}
                <li>
                    <button
                        onClick={handleExit}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#007bff',
                            cursor: 'pointer',
                            padding: 0,
                            font: 'inherit',
                            textDecoration: 'underline'
                        }}
                    >
                        Exit
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default HomePage;
