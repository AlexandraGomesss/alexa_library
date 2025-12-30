import React, { useMemo, useState } from "react";
import { rentBook } from "../services/rentService";
import { HomeButton } from "../components/HomeButton";
import { RiBookOpenLine } from "react-icons/ri";

const Rent = () => {
  const [bookId, setBookId] = useState("");
  const [rentalResult, setRentalResult] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const clientId = localStorage.getItem("clientId");

  const canSubmit = useMemo(() => {
    const cleaned = bookId.trim();
    if (!cleaned) return false;
    const n = Number(cleaned);
    return Number.isInteger(n) && n > 0 && !submitting;
  }, [bookId, submitting]);

  const handleRent = async (e) => {
    e.preventDefault();
    setError(null);
    setRentalResult(null);
    setValidationErrors({});

    if (!clientId) {
      setError("⛔ You must be logged in to rent a book.");
      return;
    }

    const bookIdNum = Number(bookId);
    const clientIdNum = Number(clientId);

    if (!Number.isInteger(bookIdNum) || bookIdNum <= 0) {
      setValidationErrors({ bookId: "Book ID must be a positive number." });
      return;
    }

    if (!Number.isInteger(clientIdNum) || clientIdNum <= 0) {
      setError("⛔ Invalid session. Please log in again.");
      return;
    }

    try {
      setSubmitting(true);
      const data = await rentBook(clientIdNum, bookIdNum);
      setRentalResult(data);
    } catch (data) {
      if (data?.errors) {
        setValidationErrors(data.errors);
      } else {
        const backendMessage = data?.message || "Something went wrong";
        if (backendMessage.toLowerCase().includes("already rented")) {
          setError("The book is already rented.");
        } else {
          setError(backendMessage);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-6 py-12">
      {/* glow soft da brand */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(60% 45% at 50% 0%, rgba(204,254,0,0.45), transparent 60%), radial-gradient(45% 40% at 15% 85%, rgba(204,254,0,0.28), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md rounded-2xl p-8 bg-gray-900/70 border border-white/10 shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Rent a Book
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Enter the Book ID to create a rental
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRent} className="mt-8">
          <label
            htmlFor="bookId"
            className="block text-sm font-medium text-white/80"
          >
            Book ID
          </label>

          <input
            type="number"
            id="bookId"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
            min={1}
            inputMode="numeric"
            className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white
                       placeholder:text-white/30 outline-none
                       focus:border-[rgba(204,254,0,0.55)] focus:ring-2 focus:ring-[rgba(204,254,0,0.18)]"
            placeholder="e.g. 12"
          />

          {validationErrors.bookId && (
            <p className="mt-2 text-sm text-red-300">
              {validationErrors.bookId}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black
                       ring-1 ring-white/10
                       transition-transform duration-200 ease-out
                       hover:scale-[1.01]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <RiBookOpenLine className="h-5 w-5" aria-hidden="true" />
            {submitting ? "Renting..." : "Rent Book"}
          </button>
        </form>

        {/* Success */}
        {rentalResult && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-gray-900/60 p-5">
            <p className="text-white">
              👍 Rental created for:{" "}
              <strong className="text-brand">{rentalResult.bookTitle}</strong>
            </p>
            <p className="mt-2 text-sm text-white/60">
              📅 Due date:{" "}
              <strong className="text-white">{rentalResult.dueDate}</strong>
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-red-200">
            ⛔ Error: {error}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <HomeButton />
        </div>
      </div>
    </div>
  );
};

export default Rent;
