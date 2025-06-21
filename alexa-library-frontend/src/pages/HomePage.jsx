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
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-gray-600 dark:text-gray-300 text-xl">Loading...</div>
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">📚 Alexa Library</h1>
                    <h2 className="text-lg text-gray-700 dark:text-gray-300">
                        Welcome, <span className="font-semibold">{client ? client.name : `Client #${clientId}`}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.to}
                            className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.subtitle}</p>
                        </Link>
                    ))}

                    <button
                        onClick={handleExit}
                        className="block text-left w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
                    >
                        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">🚪 Exit</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Log out and return to login page
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
