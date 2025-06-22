import React, { useState } from "react";
import { rentBook } from "../services/rentService";
import { HomeButton } from "../components/HomeButton";


const Rent = () => {
    const [bookId, setBookId] = useState("");
    const [rentalResult, setRentalResult] = useState(null);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const clientId = localStorage.getItem("clientId");

    const handleRent = async (e) => {
        e.preventDefault();
        setError(null);
        setRentalResult(null);
        setValidationErrors({});

        if (!clientId) {
            setError("⛔ You must be logged in to rent a book.");
            return;
        }

        try {
            const data = await rentBook(parseInt(clientId), parseInt(bookId));
            setRentalResult(data);
        } catch (data) {
            if (data?.errors) {
                setValidationErrors(data.errors);
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
                    📚 Rent a Book
                </h2>

                <form onSubmit={handleRent}>
                    <div className="mb-5">
                        <label
                            htmlFor="bookId"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Book ID
                        </label>
                        <input
                            type="number"
                            id="bookId"
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                        {validationErrors.bookId && (
                            <p className="mt-1 text-sm text-red-500">{validationErrors.bookId}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg transition focus:outline-none focus:ring-4 focus:ring-blue-300
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Rent Book
                    </button>
                </form>

                {rentalResult && (
                    <div className="mt-6 p-4 rounded-lg bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        <p>
                            👍 Rental created for: <strong>{rentalResult.bookTitle}</strong>
                        </p>
                        <p>
                            📅 Due date: <strong>{rentalResult.dueDate}</strong>
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                        ⛔ Error: {error}
                    </div>
                )}

                <div className="mt-6">
                    <HomeButton />
                </div>
            </div>
        </div>
    );
};

export default Rent;
