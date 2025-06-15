import React from "react";
import { useNavigate } from 'react-router-dom';

export const HomeButton = () => {
    const navigate = useNavigate(); // ✅ This must be called inside the component

    return (
        <button onClick={() => navigate('/home')} style={{ marginTop: '10px' }}>
            ⬅ Back to Home
        </button>
    );
};
