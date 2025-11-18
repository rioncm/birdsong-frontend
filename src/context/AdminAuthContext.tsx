import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { setAdminAuthToken } from "../api/client";

interface AdminAuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthState | undefined>(undefined);

const STORAGE_KEY = "birdsong.admin.token";

export function AdminAuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored || null;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (token) {
      window.localStorage.setItem(STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setAdminAuthToken(token);
  }, [token]);

  const login = useCallback((value: string) => {
    setToken(value.trim());
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const value = useMemo<AdminAuthState>(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [token, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuthContext(): AdminAuthState {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuthContext must be used within AdminAuthProvider");
  }
  return ctx;
}
