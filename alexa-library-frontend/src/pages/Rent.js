import React, { useState } from "react";
import axios from "axios";

const Rent = () => {
    const [clientId, setClientId] = useState("");
    const [bookId, setBookId] = useState("");
    const [rentalResult, setRentalResult] = useState(null);
    const [error, setError] = useState(null);

    const handleRent = async (e) => {
        e.preventDefault();
        setError(null);
        setRentalResult(null);

        try {
            const response = await axios.post("http://localhost:8080/rentals/rent", {
                clientId: parseInt(clientId),
                bookId: parseInt(bookId),
            });

            setRentalResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", marginTop: "40px" }}>
            <h2>📚 Rent a Book</h2>
            <form onSubmit={handleRent}>
                <div>
                    <label>Client ID</label><br />
                    <input
                        type="number"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <label>Book ID</label><br />
                    <input
                        type="number"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: "20px" }}>
                    Rent Book
                </button>
            </form>

            {rentalResult && (
                <div style={{ marginTop: "20px", color: "green" }}>
                    ✅ Rental created! ID: {rentalResult.id}
                </div>
            )}

            {error && (
                <div style={{ marginTop: "20px", color: "red" }}>
                    ❌ Error: {error}
                </div>
            )}
        </div>
    );
};

export default Rent;
