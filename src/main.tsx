import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import "./index.css";
import { startMockWorker } from "./mocks/browser";

void startMockWorker();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
