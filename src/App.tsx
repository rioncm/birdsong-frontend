import { useEffect, useMemo, useState } from "react";

import {
  BrandStylePage,
  DashboardPlaceholderPage,
  LoginPlaceholderPage,
  ProfilePlaceholderPage,
  SettingsPlaceholderPage
} from "./pages/PlaceholderPages";
import { TimelinePage } from "./pages/TimelinePage";

type AppPage = "timeline" | "dashboard" | "profile" | "settings" | "login" | "brand";

interface NavigationItem {
  id: AppPage;
  label: string;
}

const NAV_ITEMS: NavigationItem[] = [
  { id: "timeline", label: "Timeline" },
  { id: "dashboard", label: "Dashboard" },
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
  { id: "brand", label: "Brand" },
  { id: "login", label: "Login" }
];

function parsePageFromHash(hash: string): AppPage {
  const normalized = hash.replace(/^#/, "").trim().toLowerCase();
  if (NAV_ITEMS.some((item) => item.id === normalized)) {
    return normalized as AppPage;
  }
  return "timeline";
}

function renderActivePage(activePage: AppPage): JSX.Element {
  switch (activePage) {
    case "dashboard":
      return <DashboardPlaceholderPage />;
    case "profile":
      return <ProfilePlaceholderPage />;
    case "settings":
      return <SettingsPlaceholderPage />;
    case "login":
      return <LoginPlaceholderPage />;
    case "brand":
      return <BrandStylePage />;
    case "timeline":
    default:
      return <TimelinePage />;
  }
}

function App(): JSX.Element {
  const [activePage, setActivePage] = useState<AppPage>(() => parsePageFromHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(parsePageFromHash(window.location.hash));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const pageLabel = useMemo(() => {
    return NAV_ITEMS.find((item) => item.id === activePage)?.label ?? "Timeline";
  }, [activePage]);

  return (
    <div className="min-h-screen bg-brand-page bg-brand-atmosphere">
      <div className="mx-auto flex min-h-screen w-full max-w-timeline flex-col px-4 pb-10 pt-6 sm:px-6">
        <header className="card-shell sticky top-3 z-30 mb-5 overflow-hidden">
          <div className="border-b border-brand-borderSubtle bg-brand-header px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <img src="/img/mac512pt2x.png" alt="BirdSong.DIY Logo" className="h-8 w-8" />
              <div>
                <p className="font-logo text-[11px] uppercase tracking-[0.34em]">BirdSong.DIY</p>
                <p className="text-sm font-semibold text-white/85">{pageLabel}</p>
              </div>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto bg-brand-card px-3 py-3" aria-label="Application pages">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={[
                    "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    isActive
                      ? "border-brand-accentBlue bg-brand-chip text-brand-accentBlue"
                      : "border-brand-borderSubtle bg-brand-card text-brand-muted hover:bg-brand-page"
                  ].join(" ")}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </header>

        <main className="flex-1">{renderActivePage(activePage)}</main>

        <footer className="mt-8 text-center text-xs font-medium text-brand-muted">
          Local build - mobile-first v2 interface
        </footer>
      </div>
    </div>
  );
}

export default App;
