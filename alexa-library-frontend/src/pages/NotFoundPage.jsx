import React from "react";
import { useNavigate } from "react-router-dom";
import { IoWarningOutline, IoHomeOutline } from "react-icons/io5";

const NotFoundPage = () => {
  const navigate = useNavigate();

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

      <div className="relative w-full max-w-lg rounded-2xl p-8 bg-gray-900/70 border border-white/10 shadow-lg text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand ring-1 ring-white/10">
          <IoWarningOutline className="h-6 w-6 text-black" aria-hidden="true" />
        </div>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">
          404
        </h2>

        <p className="mt-2 text-sm sm:text-base text-white/60">
          Page not found. The link may be broken or the page may have moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black
                       ring-1 ring-white/10 transition-transform duration-200 ease-out hover:scale-[1.01]"
          >
            <IoHomeOutline className="h-5 w-5" aria-hidden="true" />
            Go back to Home
          </button>

          {/* <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900/70 border border-white/10 px-5 py-3
                       text-sm font-semibold text-white ring-1 ring-white/10
                       transition-transform duration-200 ease-out hover:scale-[1.01] hover:border-brand hover:text-brand"
          >
            Back
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
