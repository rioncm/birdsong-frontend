import { TimelinePage } from "./pages/TimelinePage";

function App(): JSX.Element {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-100">BirdSong Timeline</h1>
        <p className="text-sm text-slate-400">
          Explore recent detections captured by your BirdSong deployment.
        </p>
      </header>
      <main className="flex-1">
        <TimelinePage />
      </main>
    </div>
  );
}

export default App;
