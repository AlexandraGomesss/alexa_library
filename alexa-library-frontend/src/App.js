import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import NotFoundPage from './pages/NotFoundPage';
import RentPage from './pages/RentPage';
import PurchasePage from './pages/Purchase';
import MyHistory from './pages/MyHistory.jsx';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/rent" element={<RentPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/purchase" element={<PurchasePage />} />
                <Route path="/my-library" element={<MyHistory />} />
            </Routes>
        </Router>
    );
}

export default App;
