import React from "react";
import { useNavigate } from 'react-router-dom';

export const HomeButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            style={{ marginTop: '10px' }}
        >
            ⬅ Back to Home
        </button>
    );
};