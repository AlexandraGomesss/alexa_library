import React, { useState } from "react";
import axios from "axios";

const Rent = () => {
    const [clientId, setClientId] = useState("");
    const [bookId, setBookId] = useState("");
    const [rentalResult, setRentalResult] = useState(null);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const handleRent = async (e) => {
        e.preventDefault();
        setError(null);
        setRentalResult(null);
        setValidationErrors({});

        try {
            const response = await axios.post("http://localhost:8080/rentals/rent", {
                clientId: parseInt(clientId),
                bookId: parseInt(bookId),
            });

            setRentalResult(response.data);
        } catch (error) {
            console.log("Error caught from backend:", error.response?.data);

            const data = error.response?.data;
            //const backendMessage = error.response?.data?.message || "Something went wrong";

            if (data?.errors) {
                setValidationErrors(data.errors); // ⬅️ NEW
            } else {
                const backendMessage = data?.message || "Something went wrong";

                if (backendMessage.includes("already rented")) {
                    setError("The book is already rented.");
                } else {
                    setError(backendMessage);
                }
            }
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
                    <p>
                        Rental created for: {rentalResult.bookTitle}
                    </p>
                    <p>
                        The due date for returning the book is: {rentalResult.dueDate}
                    </p>
                </div>
            )}

            {error && (
                <div style={{ marginTop: "20px", color: "red" }}>
                     Error: {error}
                </div>
            )}
        </div>
    );
};

export default Rent;
