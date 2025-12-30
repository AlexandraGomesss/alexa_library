import React, { useEffect, useState } from "react";
import { fetchClientRentals, returnBook } from "../services/api";
import { HomeButton } from "../components/HomeButton";
import { LuRefreshCw } from "react-icons/lu";

const ReturnBookPage = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submittingId, setSubmittingId] = useState(null);

  const clientId = localStorage.getItem("clientId");

  useEffect(() => {
    const loadRentals = async () => {
      if (!clientId) {
        setError("⛔ You must be logged in to return a book.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchClientRentals(clientId);
        setRentals(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("⛔ Failed to load active rentals.");
      } finally {
        setLoading(false);
      }
    };

    loadRentals();
  }, [clientId]);

  const handleReturn = async (rentalId) => {
    setMessage("");
    setError("");

    try {
      setSubmittingId(rentalId);
      await returnBook(rentalId);
      setMessage("👍 Book returned successfully.");
      setRentals((prev) => prev.filter((r) => r.rentalId !== rentalId));
    } catch (err) {
      setError("⛔ Failed to return the book.");
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-90 blur-3xl"
          style={{
            backgroundImage:
              "radial-gradient(60% 45% at 50% 0%, rgba(204,254,0,0.45), transparent 60%), radial-gradient(45% 40% at 15% 85%, rgba(204,254,0,0.28), transparent 70%)",
          }}
        />
        <p className="relative text-white/70 text-lg">
          Loading active rentals...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* glow soft da brand */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(60% 45% at 50% 0%, rgba(204,254,0,0.45), transparent 60%), radial-gradient(45% 40% at 15% 85%, rgba(204,254,0,0.28), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Return a Book
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            Select one of your active rentals to return it
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-gray-900/60 p-5 text-center text-white">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-center text-red-200">
            {error}
          </div>
        )}

        {/* Content */}
        <div className="mt-10">
          {rentals.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-10 text-center">
              <p className="text-white/70">You have no active rentals.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rentals.map((rental) => {
                const isSubmitting = submittingId === rental.rentalId;

                return (
                  <div
                    key={rental.rentalId}
                    className="group rounded-2xl overflow-hidden bg-gray-900/70 border border-white/10 hover:border-brand
                               transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-lg flex flex-col"
                  >
                    <div className="relative">
                      <img
                        src={
                          rental.bookCoverUrl?.trim()
                            ? rental.bookCoverUrl
                            : "https://via.placeholder.com/300x400?text=No+Cover"
                        }
                        alt={rental.bookTitle || "Book cover"}
                        loading="lazy"
                        className="w-full aspect-[3/4] object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/300x400?text=No+Cover";
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-base font-semibold text-white group-hover:text-brand transition-colors duration-200 line-clamp-2">
                        {rental.bookTitle || "Untitled"}
                      </h3>

                      <p className="mt-2 text-sm text-white/60">
                        <span className="text-white/40">Due:</span>{" "}
                        <span className="text-white/70">{rental.dueDate}</span>
                      </p>

                      <button
                        type="button"
                        onClick={() => handleReturn(rental.rentalId)}
                        disabled={isSubmitting}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5
                                   text-sm font-semibold text-black ring-1 ring-white/10
                                   transition-transform duration-200 ease-out hover:scale-[1.01]
                                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <LuRefreshCw className="h-5 w-5" aria-hidden="true" />
                        {isSubmitting ? "Returning..." : "Return Book"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <HomeButton />
        </div>
      </div>
    </div>
  );
};

export default ReturnBookPage;
