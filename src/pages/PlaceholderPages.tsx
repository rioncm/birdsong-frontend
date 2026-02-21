import type { JSX } from "react";

interface PlaceholderCard {
  title: string;
  body: string;
  badge?: string;
}

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  cards: PlaceholderCard[];
}

function PlaceholderPage({ title, subtitle, cards }: PlaceholderPageProps): JSX.Element {
  return (
    <section className="space-y-4">
      <div className="card-shell px-4 py-4">
        <p className="text-2xl font-bold text-brand-accentBlue">{title}</p>
        <p className="mt-2 text-sm text-brand-muted">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {cards.map((card) => (
          <article key={card.title} className="card-shell px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-brand-text">{card.title}</h3>
              {card.badge && <span className="chip-quiet">{card.badge}</span>}
            </div>
            <p className="mt-2 text-sm text-brand-muted">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DashboardPlaceholderPage(): JSX.Element {
  return (
    <PlaceholderPage
      title="Dashboard"
      subtitle="Static placeholder for the dashboard phase."
      cards={[
        {
          title: "Big Numbers",
          body: "Totals, top species, and activity windows will be rendered here once dashboard APIs are connected.",
          badge: "Phase 3"
        },
        {
          title: "Charts",
          body: "Species distribution and trend charts are planned in a later phase.",
          badge: "Static"
        }
      ]}
    />
  );
}

export function ProfilePlaceholderPage(): JSX.Element {
  return (
    <PlaceholderPage
      title="User Profile"
      subtitle="Static placeholder for account and notification preferences."
      cards={[
        {
          title: "Profile Details",
          body: "Name, contact channels, and notification preferences will be editable in a future iteration.",
          badge: "Phase 4"
        },
        {
          title: "Notification Rules",
          body: "Rule authoring and channel toggles are intentionally non-interactive in this phase.",
          badge: "Static"
        }
      ]}
    />
  );
}

export function SettingsPlaceholderPage(): JSX.Element {
  return (
    <PlaceholderPage
      title="Settings"
      subtitle="Static placeholder for app-wide controls beyond timeline settings."
      cards={[
        {
          title: "System Preferences",
          body: "Theme, timezone, and advanced notification defaults will be added later.",
          badge: "Planned"
        },
        {
          title: "Device Management",
          body: "Microphone and stream management remains backend-configured for now.",
          badge: "Static"
        }
      ]}
    />
  );
}

export function LoginPlaceholderPage(): JSX.Element {
  return (
    <PlaceholderPage
      title="Login"
      subtitle="Static placeholder. Authentication screens are out of scope for this phase."
      cards={[
        {
          title: "Authentication",
          body: "Credential and SSO flows will be introduced after the timeline UI rollout stabilizes.",
          badge: "Future"
        }
      ]}
    />
  );
}

const PALETTE: Array<{ name: string; hex: string; className: string; textClass?: string }> = [
  { name: "Accent Blue", hex: "#2E4682", className: "bg-brand-accentBlue" },
  { name: "Accent Teal", hex: "#5C97AB", className: "bg-brand-accentTeal" },
  { name: "Accent Green", hex: "#79AB59", className: "bg-brand-accentGreen" },
  { name: "Accent Gold", hex: "#F19743", className: "bg-brand-accentGold" },
  { name: "Accent Lime", hex: "#B9E24A", className: "bg-brand-accentLime", textClass: "text-brand-text" },
  { name: "Accent Red", hex: "#D44130", className: "bg-brand-accentRed" }
];

export function BrandStylePage(): JSX.Element {
  return (
    <section className="space-y-4">
      <div className="card-shell overflow-hidden">
        <div className="border-b border-brand-borderSubtle bg-brand-cardHeader px-4 py-3">
          <p className="text-xl font-bold text-brand-accentBlue">Brand Style</p>
          <p className="mt-1 text-sm text-brand-muted">Color and typography reference used by the v2 UI.</p>
        </div>
        <div className="space-y-4 px-4 py-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PALETTE.map((color) => (
              <div key={color.name} className="overflow-hidden rounded-xl border border-brand-borderSubtle">
                <div className={`${color.className} ${color.textClass ?? "text-white"} flex h-16 items-center justify-center px-2 text-center text-xs font-bold`}>
                  {color.name}
                </div>
                <div className="bg-brand-card px-2 py-2 text-center text-xs font-semibold text-brand-muted">
                  {color.hex}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-brand-borderSubtle bg-brand-page px-3 py-3">
            <p className="font-logo text-xs uppercase tracking-[0.24em] text-brand-accentBlue">BirdSong.DIY</p>
            <p className="mt-2 font-heading text-lg font-bold text-brand-accentBlue">Raleway Heading</p>
            <p className="mt-1 text-sm text-brand-text">Nunito Sans body text for clear mobile readability.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
