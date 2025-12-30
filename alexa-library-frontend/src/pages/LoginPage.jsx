import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

const LoginPage = () => {
  const [clientId, setClientId] = useState("");
  const [remember, setRemember] = useState(false); // se mais tarde quiseres usar
  const navigate = useNavigate();

  const canSubmit = useMemo(() => clientId.trim().length > 0, [clientId]);

  const handleLogin = (e) => {
    e.preventDefault();

    const cleaned = clientId.trim();
    if (!cleaned) return;

    // Segurança: isto não é autenticação real. Para demo ok.
    localStorage.setItem("clientId", cleaned);

    // Nota: se implementares "remember", o ideal é cookies httpOnly no backend.
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-6">
      {/* glow soft da brand */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(60% 45% at 50% 0%, rgba(204,254,0,0.45), transparent 60%), radial-gradient(45% 40% at 15% 85%, rgba(204,254,0,0.28), transparent 70%)",
        }}
      />

      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-md rounded-2xl p-8 bg-gray-900/70 border border-white/10 shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Alexa Library
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Sign in to access your rentals and purchases
          </p>
        </div>

        <div className="mt-8">
          <label
            htmlFor="clientId"
            className="block text-sm font-medium text-white/80"
          >
            Client ID
          </label>

          <input
            type="text"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Enter your client ID"
            required
            autoComplete="off"
            className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white
                       placeholder:text-white/30 outline-none
                       focus:border-[rgba(204,254,0,0.55)] focus:ring-2 focus:ring-[rgba(204,254,0,0.18)]"
          />
        </div>

        {/* Se quiseres reativar mais tarde */}
        {/* 
        <div className="mt-4 flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-black/30 text-[rgba(204,254,0,1)] focus:ring-[rgba(204,254,0,0.25)]"
          />
          <label htmlFor="remember" className="text-sm text-white/60">
            Remember me
          </label>
        </div>
        */}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black
                     ring-1 ring-white/10
                     transition-transform duration-200 ease-out
                     hover:scale-[1.01]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <IoLogInOutline className="h-5 w-5" aria-hidden="true" />
          Submit
        </button>

        <p className="mt-6 text-center text-xs text-white/40">
          Tip: use the Client ID provided by the library.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
