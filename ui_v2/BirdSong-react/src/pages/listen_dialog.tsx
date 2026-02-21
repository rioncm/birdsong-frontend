import React from "react";

const ListenDialogPage: React.FC = () => (
  <>
    <div className="bg-white dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 antialiased">
      <div className="items-center justify-center px-4 py-12 bg-white dark:bg-neutral-950 relative isolate min-h-screen flex">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="h-[60vh] w-[60vh] rounded-full bg-gradient-to-br absolute -top-32 -left-32 from-indigo-200
          via-lime-200 to-purple-300 opacity-20 blur-2xl dark:opacity-0"></div>
          <div className="h-[40vh] w-[50vh] rounded-full bg-gradient-to-tr absolute -bottom-20 right-10 from-fuchsia-300
          via-orange-300 to-rose-200 opacity-40 blur-3xl dark:opacity-0"></div>
          <div className="h-[35vh] w-[45vh] rounded-full bg-gradient-to-b dark:h-[28vh] absolute top-28 left-1/4 from-orange-300
          via-amber-200 to-rose-100 opacity-60 blur-3xl dark:from-orange-600 dark:via-amber-500 dark:to-rose-400
          dark:opacity-64"></div>
        </div>
        <div className="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-xl max-w-2xl border border-neutral-200
        dark:border-neutral-800 overflow-hidden">
          <div className="px-6 py-5 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
            <p className="text-2xl font-bold text-gray-900 dark:text-neutral-100">Listen to SPECIES NAME</p>
            <p className="text-sm text-gray-600 mt-1 dark:text-neutral-400">Select a recording to play it.</p>
          </div>
          <div className="px-6 py-8 space-y-8">
            <div className="rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-500 h-2.5"></div>
              <div className="bg-white p-4 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
                    <div className="text-gray-900">January 1, 2024</div>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Time</label>
                    <div className="text-gray-900">12:00 PM</div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Play</label>
                  <div className="items-center flex gap-3">
                    <button type="submit" className="hover:bg-blue-600 flex w-10 h-10 rounded-full bg-blue-500 items-center
                    justify-center text-white">
                      <span className="items-center justify-center w-4 h-4 ml-0.5 flex">
                        <svg class="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 2v12l10-6L3 2z"></path>
            </svg>
                      </span>
                    </button>
                    <input type="range" className="flex-1 appearance-none cursor-pointer h-2 bg-gray-200 rounded-lg
                    accent-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-neutral-50 sm:flex-row sm:items-center sm:justify-between dark:bg-neutral-800 border-t
          border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
            <div className="items-center flex gap-3">
              <button type="button" className="dark:text-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-300
              focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 transition-all
              dark:bg-neutral-200 px-5 py-2.5 text-sm font-medium text-white bg-neutral-800 rounded-lg" /><< Back</button />
              <button type="button" className="dark:text-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-300
              focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 transition-all
              dark:bg-neutral-200 px-5 py-2.5 text-sm font-medium text-white bg-neutral-800 rounded-lg">Next >></button>
            </div>
            <div className="items-center flex gap-3">
              <button type="button" className="dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600
              hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500
              dark:focus:ring-neutral-600 transition-all dark:bg-neutral-700 px-5 py-2.5 text-sm font-medium
              text-gray-700 bg-white rounded-lg">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="min-h-screen bg-brand-surface">
      <div className="mx-auto w-full px-4 pb-16 pt-10 sm:px-6 flex min-h-screen max-w-timeline flex-col">
        <header className="mb-8 space-y-3">
          <div className="items-center flex gap-3">
            <img alt="BirdSong.DIY Logo" src="https://app.windframe.dev/img/mac512pt2x.png" className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="text-xs tracking-[0.4em] font-logo uppercase text-brand-lagoon">BirdSong.DIY</span>
          </div>
          <p className="text-3xl leading-tight text-brand-navy">Detection Timeline</p>
          <p className="text-sm text-brand-muted">Private development build showing recent detections from your local
          monitors.</p>
        </header>
        <main className="flex-1 space-y-6">
          <div></div>
        </main>
        <footer className="mt-12 text-center text-xs text-brand-muted">Local-only environment · Phase 1 preview</footer>
      </div>
    </div>
  </>
);

export default ListenDialogPage;