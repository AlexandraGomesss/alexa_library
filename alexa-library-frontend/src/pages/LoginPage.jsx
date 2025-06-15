import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [clientId, setClientId] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // In real app, you could verify client ID with backend
        if (clientId.trim() !== '') {
            localStorage.setItem('clientId', clientId); // save client ID to use in other pages
            navigate('/home');
        }
    };

    return (
        <div>
            <h2>Welcome to Alexa Library</h2>
            <input
                type="text"
                placeholder="Enter your client ID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
            />
            <button onClick={handleLogin}>Enter</button>
        </div>
    );
};

export default LoginPage;
