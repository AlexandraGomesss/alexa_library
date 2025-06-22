import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [clientId, setClientId] = useState('');
    //const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // prevent page reload
        if (clientId.trim() !== '') {
            localStorage.setItem('clientId', clientId);
            navigate('/home');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleLogin}
                className="max-w-sm w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Welcome to Alexa Library 📖
                </h2>

                <div className="mb-5">
                    <label
                        htmlFor="clientId"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Client ID
                    </label>
                    <input
                        type="text"
                        id="clientId"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter your client ID"
                        required
                    />
                </div>

               {/* <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="••••••••"
                        required
                    />
                </div>*/}

                {/*<div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                        />
                    </div>
                    <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Remember me
                    </label>
                </div>*/}

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
