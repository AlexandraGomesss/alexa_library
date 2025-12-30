import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailableBooks } from "../services/bookService";
import { createPurchase } from "../services/purchaseService";
import { HomeButton } from "../components/HomeButton";
import { IoCartOutline } from "react-icons/io5";

const PurchasePage = () => {
  const clientId = localStorage.getItem("clientId");
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const formatEUR = useMemo(() => {
    try {
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const allBooks = await getAvailableBooks();
        const filteredBooks = (Array.isArray(allBooks) ? allBooks : []).filter(
          (book) =>
            book?.forSale &&
            book?.available &&
            Number(book?.quantityAvailable) > 0
        );
        setBooks(filteredBooks);
      } catch (error) {
        console.error("⛔ Error fetching books:", error);
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchBooks();
  }, []);

  const selectedBook = useMemo(() => {
    if (!selectedBookId) return null;
    const idNum = Number(selectedBookId);
    return books.find((b) => Number(b.id) === idNum) || null;
  }, [books, selectedBookId]);

  const maxQtyForSelected = useMemo(() => {
    const available = Number(selectedBook?.quantityAvailable ?? 0);
    if (!Number.isFinite(available) || available <= 0) return 1;
    return Math.min(available, 99);
  }, [selectedBook]);

  useEffect(() => {
    if (!selectedBook) return;
    setQuantity((q) => {
      const qNum = Number(q);
      if (!Number.isFinite(qNum) || qNum < 1) return 1;
      return Math.min(qNum, maxQtyForSelected);
    });
  }, [selectedBook, maxQtyForSelected]);

  const canSubmit = useMemo(() => {
    const qOk =
      Number.isInteger(quantity) &&
      quantity >= 1 &&
      quantity <= maxQtyForSelected;

    return (
      !!clientId &&
      !!selectedBookId &&
      !!selectedBook &&
      qOk &&
      !submitting &&
      !loadingBooks
    );
  }, [
    clientId,
    selectedBookId,
    selectedBook,
    quantity,
    maxQtyForSelected,
    submitting,
    loadingBooks,
  ]);

  const priceLabel = (book) => {
    const price = Number(book?.price ?? 0);
    if (!Number.isFinite(price)) return `${book?.price ?? ""} €`;
    return formatEUR ? formatEUR.format(price) : `${price} €`;
  };

  const totalLabel = useMemo(() => {
    if (!selectedBook) return null;
    const price = Number(selectedBook?.price ?? 0);
    const q = Number(quantity ?? 0);
    const total = price * q;

    if (!Number.isFinite(total)) return null;
    return formatEUR ? formatEUR.format(total) : `${total} €`;
  }, [selectedBook, quantity, formatEUR]);

  const resetForm = () => {
    setSelectedBookId("");
    setQuantity(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!clientId) {
      setMessage("⛔ You must be logged in to purchase a book.");
      return;
    }

    if (!selectedBook) {
      setMessage("⛔ Please select a valid book.");
      return;
    }

    if (quantity > maxQtyForSelected) {
      setMessage("⛔ Quantity exceeds available stock.");
      return;
    }

    try {
      setSubmitting(true);
      await createPurchase(clientId, selectedBookId, quantity);
      setMessage("👍 Purchase successful!");
      resetForm();
    } catch (error) {
      console.error("⛔ Error making purchase:", error);
      setMessage("⛔ Purchase failed. Please try again.");
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
            Purchase a Book
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Choose a book and quantity to complete your purchase
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          {/* Select (só título) */}
          <label
            htmlFor="book"
            className="block text-sm font-medium text-white/80"
          >
            Select Book
          </label>

          <select
            id="book"
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            required
            disabled={loadingBooks}
            className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white
                       outline-none
                       focus:border-[rgba(204,254,0,0.55)] focus:ring-2 focus:ring-[rgba(204,254,0,0.18)]
                       disabled:opacity-60"
          >
            <option value="">
              {loadingBooks ? "Loading books..." : "-- Choose a book --"}
            </option>

            {books.map((book) => (
              <option key={book.id} value={book.id} className="bg-gray-900">
                {book.title}
              </option>
            ))}
          </select>

          {/* Detalhe elegante (autor/preço/stock/total) */}
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-4">
            {!selectedBook ? (
              <p className="text-sm text-white/60">
                Select a book to see details.
              </p>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-white">
                  <span className="text-white/60">Author:</span>{" "}
                  <span className="font-medium">{selectedBook.author}</span>
                </p>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white">
                    <span className="text-white/60">Price:</span>{" "}
                    <span className="font-semibold text-brand">
                      {priceLabel(selectedBook)}
                    </span>
                  </p>

                  <p className="text-sm text-white">
                    <span className="text-white/60">Stock:</span>{" "}
                    <span className="font-medium">
                      {selectedBook.quantityAvailable}
                    </span>
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-gray-900/40 px-3 py-2">
                  <span className="text-xs text-white/60">Total</span>
                  <span className="text-sm font-semibold text-white">
                    {selectedBook ? totalLabel : "—"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quantity */}
          <label
            htmlFor="quantity"
            className="mt-5 block text-sm font-medium text-white/80"
          >
            Quantity
          </label>

          <input
            type="number"
            id="quantity"
            min="1"
            max={maxQtyForSelected}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            disabled={!selectedBook}
            className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white
                       placeholder:text-white/30 outline-none
                       focus:border-[rgba(204,254,0,0.55)] focus:ring-2 focus:ring-[rgba(204,254,0,0.18)]
                       disabled:opacity-60"
          />

          <p className="mt-2 text-xs text-white/60">
            Max:{" "}
            <span className="text-white">
              {selectedBook ? maxQtyForSelected : 0}
            </span>
          </p>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black
                       ring-1 ring-white/10
                       transition-transform duration-200 ease-out
                       hover:scale-[1.01]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <IoCartOutline className="h-5 w-5" aria-hidden="true" />
            {submitting ? "Purchasing..." : "Purchase"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 rounded-2xl border p-5 text-sm font-medium ${
              message.includes("👍")
                ? "border-white/10 bg-gray-900/60 text-white"
                : "border-red-400/30 bg-red-500/10 text-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <HomeButton />
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
