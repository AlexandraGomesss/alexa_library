import React, { useEffect, useState } from "react";
import { fetchClientRentals, fetchClientPurchases } from "../services/api.js";
import { HomeButton } from "../components/HomeButton";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

function MyHistory() {
  const [rentals, setRentals] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clientId = localStorage.getItem("clientId");

    if (!clientId) {
      setError("⛔ You must be logged in to view history.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const rentalData = await fetchClientRentals(clientId);
        const purchaseData = await fetchClientPurchases(clientId);

        setRentals(Array.isArray(rentalData) ? rentalData : []);
        setPurchases(Array.isArray(purchaseData) ? purchaseData : []);
        setError("");
      } catch (err) {
        setError(
          "⛔ Failed to fetch data. Make sure the client ID is correct."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            My Rentals & Purchases
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            Your activity history in Alexa Library
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-red-200 text-center">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && !error && (
          <div className="mt-8 flex items-center justify-center rounded-2xl border border-white/10 bg-gray-900/50 p-10">
            <p className="text-white/70">Loading history...</p>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <div className="mt-10 space-y-10">
            {/* Rentals */}
            <section>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand ring-1 ring-white/10">
                    <IoTimeOutline
                      className="h-5 w-5 text-black"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      Rentals
                    </h3>
                    <p className="text-sm text-white/60">
                      Books currently or previously rented
                    </p>
                  </div>
                </div>

                <span className="text-sm text-white/50">
                  {rentals.length} item{rentals.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-6">
                {rentals.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-8 text-center">
                    <p className="text-white/70">
                      You haven’t rented any books yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {rentals.map((rental) => (
                      <div
                        key={rental.id}
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
                          <h4 className="text-base font-semibold text-white group-hover:text-brand transition-colors duration-200 line-clamp-2">
                            {rental.bookTitle || "Untitled"}
                          </h4>

                          <div className="mt-3 space-y-1 text-sm text-white/60">
                            <p>
                              <span className="text-white/40">Rented on:</span>{" "}
                              <span className="text-white/70">
                                {rental.startDate}
                              </span>
                            </p>
                            <p>
                              <span className="text-white/40">Due:</span>{" "}
                              <span className="text-white/70">
                                {rental.dueDate}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Purchases */}
            <section>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand ring-1 ring-white/10">
                    <IoCartOutline
                      className="h-5 w-5 text-black"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      Purchases
                    </h3>
                    <p className="text-sm text-white/60">
                      Books you have purchased
                    </p>
                  </div>
                </div>

                <span className="text-sm text-white/50">
                  {purchases.length} item{purchases.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-6">
                {purchases.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-8 text-center">
                    <p className="text-white/70">
                      You haven’t purchased any books yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="group rounded-2xl overflow-hidden bg-gray-900/70 border border-white/10 hover:border-brand
                                   transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-lg flex flex-col"
                      >
                        <div className="relative">
                          <img
                            src={
                              purchase.bookCoverUrl?.trim()
                                ? purchase.bookCoverUrl
                                : "https://via.placeholder.com/300x400?text=No+Cover"
                            }
                            alt={purchase.bookTitle || "Book cover"}
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
                          <h4 className="text-base font-semibold text-white group-hover:text-brand transition-colors duration-200 line-clamp-2">
                            {purchase.bookTitle || "Untitled"}
                          </h4>

                          <div className="mt-3 text-sm text-white/60">
                            <p>
                              <span className="text-white/40">
                                Purchased on:
                              </span>{" "}
                              <span className="text-white/70">
                                {purchase.purchaseDate}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <HomeButton />
        </div>
      </div>
    </div>
  );
}

export default MyHistory;
