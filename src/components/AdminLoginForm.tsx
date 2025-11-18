import { useState } from "react";
import type { FormEvent } from "react";

import { useAdminAuth } from "../hooks/useAdminAuth";

export function AdminLoginForm(): JSX.Element {
  const { login } = useAdminAuth();
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!token.trim()) {
      setError("Enter the admin token provided by the backend.");
      return;
    }
    setError(null);
    login(token.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-brand-border bg-white/70 p-4 shadow-sm">
      <div>
        <label htmlFor="admin-token" className="text-sm font-medium text-brand-navy">
          Admin API token
        </label>
        <input
          id="admin-token"
          type="password"
          className="mt-1 w-full rounded-md border border-brand-border px-3 py-2 text-sm shadow-inner focus:border-brand-lagoon focus:outline-none"
          placeholder="Enter dev token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
        <p className="mt-1 text-xs text-brand-muted">
          Use the bearer token configured in the backend (temporary stub until full auth is live).
        </p>
        {error ? <p className="mt-2 text-sm text-brand-signal-error">{error}</p> : null}
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-brand-navy px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy/90"
      >
        Sign in
      </button>
    </form>
  );
}
