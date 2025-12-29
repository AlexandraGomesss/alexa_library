import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getClientById } from "../services/clientService";
import {
  IoBookOutline,
  IoCartOutline,
  IoTimeOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { LuRefreshCw } from "react-icons/lu";
import { RiBookOpenLine } from "react-icons/ri";

const HomePage = () => {
  const clientId = localStorage.getItem("clientId");
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("clientId");
    localStorage.removeItem("clientName");
    localStorage.removeItem("token");
    navigate("/login");
    alert("👍 You have been logged out successfully. Goodbye!");
  };

  useEffect(() => {
    const fetchClientData = async () => {
      if (clientId) {
        try {
          const clientData = await getClientById(clientId);
          setClient(clientData);
          localStorage.setItem("clientName", clientData.name);
        } catch (error) {
          console.error("⛔ Error loading client data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchClientData();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-300 text-xl">
          Loading...
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      to: "/books",
      title: "Available Books",
      subtitle: "View all books currently available",
      icon: IoBookOutline,
    },
    {
      to: "/rent",
      title: "Rent a Book",
      subtitle:
        "Rent books for flexible periods. Perfect for students, researchers, or casual readers.",
      icon: RiBookOpenLine,
    },
    {
      to: "/purchase",
      title: "Purchase a Book",
      subtitle:
        "Buy your favorite books to keep forever. Build your personal library collection.",
      icon: IoCartOutline,
    },
    {
      to: "/my-library",
      title: "My Library",
      subtitle: "View your rentals and purchases",
      icon: MdOutlineLibraryBooks,
    },
    {
      to: "/return-book",
      title: "Return a Book",
      subtitle: "Finish your rental and return your book.",
      icon: LuRefreshCw,
    },
    {
      to: "/extend-rental",
      title: "Extend a Rental",
      subtitle:
        "Need more time? Easily extend your rental period with just a few clicks.",
      icon: IoTimeOutline,
    },
  ];

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
      <div className="relative mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            📖 Alexa Library
          </h1>

          <p className="mt-3 text-sm sm:text-base text-brand">
            Welcome,{" "}
            <span className="font-medium text-brand">
              {client ? client.name : `Client #${clientId}`}
            </span>
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                to={item.to}
                className="group block rounded-2xl p-6 bg-gray-900/70 border border-white/10 hover:border-brand
                 transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg"
              >
                <div className="flex flex-col items-start">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-black" aria-hidden="true" />
                  </span>

                  <h3 className="mt-4 text-base font-semibold text-white transition-colors duration-200 group-hover:text-brand">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}

          <button
            onClick={handleExit}
            type="button"
            className="group block w-full text-left rounded-2xl p-6
             bg-gray-900/70 border border-white/10
             hover:border-red-400/60
             transition-transform duration-200 ease-out
             hover:scale-[1.03] hover:shadow-lg"
          >
            <div className="flex flex-col items-start">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-300 ring-1 ring-white/10">
                <IoLogOutOutline
                  className="h-5 w-5 text-black"
                  aria-hidden="true"
                />
              </span>

              <h3 className="mt-4 text-base font-semibold text-white transition-colors duration-200 group-hover:text-red-300">
                Exit
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Log out and return to login page
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
