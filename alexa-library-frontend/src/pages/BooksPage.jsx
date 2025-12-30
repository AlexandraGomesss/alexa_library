import React, { useEffect, useMemo, useState } from "react";
import { getAvailableBooks } from "../services/bookService";
import { HomeButton } from "../components/HomeButton";
import { IoBookOutline } from "react-icons/io5";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvailableBooks()
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch((error) => console.error("⛔ Error fetching books:", error))
      .finally(() => setLoading(false));
  }, []);

  const hasBooks = useMemo(() => books.length > 0, [books.length]);

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
            Available Books
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            Browse all books currently available
          </p>
        </div>

        {/* Content */}
        <div className="mt-10">
          {loading ? (
            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-gray-900/50 p-10">
              <p className="text-white/70">Loading books...</p>
            </div>
          ) : !hasBooks ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-gray-900/50 p-10 text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand ring-1 ring-white/10">
                <IoBookOutline
                  className="h-5 w-5 text-black"
                  aria-hidden="true"
                />
              </span>
              <p className="text-white/70">No books available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="group rounded-2xl overflow-hidden bg-gray-900/70 border border-white/10 hover:border-brand
                             transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-lg flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={
                        book.coverURL?.trim()
                          ? book.coverURL
                          : "https://via.placeholder.com/300x400?text=No+Cover"
                      }
                      alt={book.title || "Book cover"}
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/300x400?text=No+Cover";
                      }}
                    />

                    {/* overlay suave para ficar no mesmo mood */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-white group-hover:text-brand transition-colors duration-200 line-clamp-2">
                      {book.title || "Untitled"}
                    </h3>

                    <p className="mt-2 text-sm text-white/60 line-clamp-1">
                      by {book.author || "Unknown author"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <HomeButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
