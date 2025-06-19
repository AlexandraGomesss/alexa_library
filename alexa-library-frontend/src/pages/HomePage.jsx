import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getClientById } from '../services/clientService';

const HomePage = () => {
    const clientId = localStorage.getItem('clientId');
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleExit = () => {
        localStorage.removeItem('clientId');
        localStorage.removeItem('clientName');
        localStorage.removeItem('token');
        navigate('/login');
        alert('You have been logged out successfully. Goodbye!');
    };

    useEffect(() => {
        const fetchClientData = async () => {
            if (clientId) {
                try {
                    const clientData = await getClientById(clientId);
                    setClient(clientData);
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
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-600 text-xl">Loading...</div>
            </div>
        );
    }

    const menuItems = [
        { to: "/books", title: "📖 Available Books", subtitle: "Access all books currently available" },
        { to: "/rent", title: "📚 Rent a Book", subtitle: "Choose a book and start reading today" },
        { to: "/purchase", title: "🛒 Purchase a Book", subtitle: "Buy your favorite titles" },
        { to: "/my-library", title: "📁 My Library", subtitle: "View your rentals and purchases" },
        { to: "/return-book", title: "🔄 Return a Book", subtitle: "Manage your current rentals" },
        { to: "/extend-rental", title: "⏳ Extend a Rental", subtitle: "Need more time? Extend here" },
    ];

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">📚 Alexa Library</h1>
            <h2 className="text-lg text-center text-gray-700 dark:text-gray-200 mb-8">
                Welcome, <span className="font-semibold">{client ? client.name : `Client #${clientId}`}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.subtitle}</p>
                    </Link>
                ))}

                <button
                    onClick={handleExit}
                    className="block p-6 text-left w-full bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
                >
                    <h3 className="text-lg font-semibold text-red-600 dark:hover:text-red-400">🚪 Exit</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Log out and return to login page</p>
                </button>
            </div>
        </div>
    );
};

export default HomePage;
