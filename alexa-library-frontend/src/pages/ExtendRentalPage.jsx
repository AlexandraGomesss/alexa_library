import React, { useEffect, useMemo, useState } from "react";
import { fetchClientRentals, extendRental } from "../services/api";
import { HomeButton } from "../components/HomeButton";
import { IoTimeOutline } from "react-icons/io5";

const ExtendRentalPage = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submittingId, setSubmittingId] = useState(null);

  const clientId = localStorage.getItem("clientId");

  const formatDate = useMemo(() => {
    // Evita dependência de locale do browser (mantém consistente em PT)
    return (isoDateLike) => {
      if (!isoDateLike) return "";
      const d = new Date(isoDateLike);
      if (Number.isNaN(d.getTime())) return String(isoDateLike);
      return new Intl.DateTimeFormat("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(d);
    };
  }, []);

  useEffect(() => {
    const loadRentals = async () => {
      if (!clientId) {
        setError("⛔ You must be logged in to extend a rental.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchClientRentals(clientId);
        setRentals(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        console.error("⛔ Failed to fetch rentals:", err);
        setError("⛔ Failed to load active rentals.");
      } finally {
        setLoading(false);
      }
    };

    loadRentals();
  }, [clientId]);

  const addDaysISO = (isoDateLike, days) => {
    const d = new Date(isoDateLike);
    if (Number.isNaN(d.getTime())) return isoDateLike;

    // Ajuste simples por dias; para edge cases de timezone, ideal é o backend devolver a data final
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  };

  const handleExtend = async (rentalId) => {
    setMessage("");
    setError("");

    try {
      setSubmittingId(rentalId);

      // Não confies no frontend para calcular datas em produção.
      // O ideal é o backend devolver o novo dueDate.
      await extendRental(rentalId);

      setMessage("✅ Rental extended successfully.");

      setRentals((prevRentals) =>
        prevRentals.map((rental) =>
          rental.rentalId === rentalId
            ? { ...rental, dueDate: addDaysISO(rental.dueDate, 14) }
            : rental
        )
      );
    } catch (err) {
      console.error("Error extending rental:", err);
      setError("⛔ Failed to extend rental.");
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
        <p className="relative text-white/70 text-lg">Loading rentals...</p>
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
            Extend Book Rental
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            Extend an active rental by 14 days
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
              <p className="text-white/70">
                You have no active rentals to extend.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rentals.map((rental) => {
                const isSubmitting = submittingId === rental.rentalId;

                return (
                  <div
                    key={rental.rentalId}
                    className="group rounded-2xl bg-gray-900/70 border border-white/10 hover:border-brand
                               transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-lg
                               p-5 flex flex-col"
                  >
                    <h3 className="text-base font-semibold text-white group-hover:text-brand transition-colors duration-200 line-clamp-2">
                      {rental.bookTitle || "Untitled"}
                    </h3>

                    <p className="mt-2 text-sm text-white/60">
                      <span className="text-white/40">Due Date:</span>{" "}
                      <span className="text-white/70">
                        {formatDate(rental.dueDate)}
                      </span>
                    </p>

                    <button
                      type="button"
                      onClick={() => handleExtend(rental.rentalId)}
                      disabled={isSubmitting}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5
                                 text-sm font-semibold text-black ring-1 ring-white/10
                                 transition-transform duration-200 ease-out hover:scale-[1.01]
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <IoTimeOutline className="h-5 w-5" aria-hidden="true" />
                      {isSubmitting ? "Extending..." : "Extend Rental"}
                    </button>
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

export default ExtendRentalPage;
