import { TimelinePage } from "./pages/TimelinePage";

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-brand-surface">
      <div className="mx-auto flex min-h-screen w-full max-w-timeline flex-col px-4 pb-16 pt-10 sm:px-6">
        <header className="mb-8 space-y-3">
          <span className="font-logo text-xs uppercase tracking-[0.4em] text-brand-lagoon">BirdSong</span>
          <h1 className="text-3xl leading-tight text-brand-navy">Detection Timeline</h1>
          <p className="text-sm text-brand-muted">
            Private development build showing recent detections from your local monitors.
          </p>
        </header>
        <main className="flex-1 space-y-6">
          <TimelinePage />
        </main>
        <footer className="mt-12 text-center text-xs text-brand-muted">
          Local-only environment · Phase 1 preview
        </footer>
      </div>
    </div>
  );
}

export default App;
