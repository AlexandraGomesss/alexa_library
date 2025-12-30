import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

export const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/home")}
      className="inline-flex items-center gap-2 rounded-xl bg-gray-900/70 border border-white/10
                 px-4 py-2.5 text-sm font-semibold text-white
                 ring-1 ring-white/10
                 transition-transform duration-200 ease-out
                 hover:scale-[1.02] hover:border-brand hover:text-brand
                 focus:outline-none focus:ring-2 focus:ring-[rgba(204,254,0,0.18)]"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand ring-1 ring-white/10">
        <IoArrowBackOutline className="h-4 w-4 text-black" aria-hidden="true" />
      </span>
      Back to Home
    </button>
  );
};
