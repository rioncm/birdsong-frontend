import { useState } from "react";

import { AdminLoginForm } from "./components/AdminLoginForm";
import { useAdminAuth } from "./hooks/useAdminAuth";
import { AdminSettingsPage } from "./pages/AdminSettingsPage";
import { TimelinePage } from "./pages/TimelinePage";

type ActiveView = "timeline" | "admin";

function App(): JSX.Element {
  const [activeView, setActiveView] = useState<ActiveView>("timeline");
  const { isAuthenticated, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-brand-surface">
      <div className="mx-auto flex min-h-screen w-full max-w-timeline flex-col px-4 pb-16 pt-10 sm:px-6">
        <header className="mb-8 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/img/mac512pt2x.png"
                alt="BirdSong.DIY Logo"
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
              <span className="font-logo text-xs uppercase tracking-[0.4em] text-brand-lagoon">BirdSong.DIY</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              <button
                type="button"
                onClick={() => setActiveView("timeline")}
                className={`rounded-full px-3 py-1 ${
                  activeView === "timeline" ? "bg-brand-navy text-white" : "bg-transparent"
                }`}
              >
                Timeline
              </button>
              <button
                type="button"
                onClick={() => setActiveView("admin")}
                className={`rounded-full px-3 py-1 ${
                  activeView === "admin" ? "bg-brand-navy text-white" : "bg-transparent"
                }`}
              >
                Admin
              </button>
              {activeView === "admin" && isAuthenticated ? (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full px-3 py-1 text-brand-signal-error"
                >
                  Sign out
                </button>
              ) : null}
            </div>
          </div>
          <div>
            <h1 className="text-3xl leading-tight text-brand-navy">
              {activeView === "timeline" ? "Detection Timeline" : "Admin Settings"}
            </h1>
            <p className="text-sm text-brand-muted">
              {activeView === "timeline"
                ? "Private development build showing recent detections from your local monitors."
                : "Manage runtime configuration, cache, and credentials."}
            </p>
          </div>
        </header>
        <main className="flex-1 space-y-6">
          {activeView === "timeline" ? <TimelinePage /> : isAuthenticated ? <AdminSettingsPage /> : <AdminLoginForm />}
        </main>
        <footer className="mt-12 text-center text-xs text-brand-muted">
          Local-only environment · Phase 1 preview
        </footer>
      </div>
    </div>
  );
}

export default App;
