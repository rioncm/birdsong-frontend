import React from "react";

const IndexPage: React.FC = () =&gt; (
  &lt;&gt;
    <div classname="bg-white dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 antialiased">
      <div classname="items-center justify-center px-4 py-12 bg-white dark:bg-neutral-950 relative isolate min-h-screen flex">
        <div classname="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div classname="h-[60vh] w-[60vh] rounded-full bg-gradient-to-br absolute -top-32 -left-32 from-indigo-200
          via-lime-200 to-purple-300 opacity-20 blur-2xl dark:opacity-0"></div>
          <div classname="h-[40vh] w-[50vh] rounded-full bg-gradient-to-tr absolute -bottom-20 right-10 from-fuchsia-300
          via-orange-300 to-rose-200 opacity-40 blur-3xl dark:opacity-0"></div>
          <div classname="h-[35vh] w-[45vh] rounded-full bg-gradient-to-b dark:h-[28vh] absolute top-28 left-1/4 from-orange-300
          via-amber-200 to-rose-100 opacity-60 blur-3xl dark:from-orange-600 dark:via-amber-500 dark:to-rose-400
          dark:opacity-64"></div>
        </div>
        <div classname="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-xl max-w-2xl border border-neutral-200
        dark:border-neutral-800 overflow-hidden">
          <div classname="px-6 py-5 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
            <p classname="text-2xl font-bold text-gray-900 dark:text-neutral-100">Timeline Settings</p>
            <p classname="text-sm text-gray-600 mt-1 dark:text-neutral-400">Configure your timeline start date, time, and
            grouping interval</p>
          </div>
          <div classname="px-6 py-8 space-y-8">
            <div classname="space-y-6">
              <div>
                <label classname="text-sm font-semibold text-gray-800 mb-3 block dark:text-neutral-200">Time Grouping
                (Minutes)</label>
                <div classname="grid grid-cols-5 gap-3">
                  <label classname="items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-lg flex p-4 border-2
                  border-neutral-800 dark:border-neutral-200 cursor-pointer hover:bg-neutral-100
                  dark:hover:bg-neutral-750 transition-colors">
                    <input name="timeGrouping" value="5" defaultchecked="" type="radio" classname="sr-only peer" />
                    <span classname="text-center">
                      <span classname="text-lg font-bold text-gray-800 block dark:text-neutral-200">5</span>
                      <span classname="text-xs text-gray-500 mt-1 block dark:text-neutral-400">min</span>
                    </span>
                  </label>
                  <label classname="items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-lg flex p-4 border-2
                  border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-100
                  dark:hover:bg-neutral-750 transition-colors has-[:checked]:border-neutral-800
                  has-[:checked]:dark:border-neutral-200">
                    <input name="timeGrouping" value="10" type="radio" classname="sr-only peer" />
                    <span classname="text-center">
                      <span classname="text-lg font-bold text-gray-800 block dark:text-neutral-200">10</span>
                      <span classname="text-xs text-gray-500 mt-1 block dark:text-neutral-400">min</span>
                    </span>
                  </label>
                  <label classname="items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-lg flex p-4 border-2
                  border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-100
                  dark:hover:bg-neutral-750 transition-colors has-[:checked]:border-neutral-800
                  has-[:checked]:dark:border-neutral-200">
                    <input name="timeGrouping" value="20" type="radio" classname="sr-only peer" />
                    <span classname="text-center">
                      <span classname="text-lg font-bold text-gray-800 block dark:text-neutral-200">20</span>
                      <span classname="text-xs text-gray-500 mt-1 block dark:text-neutral-400">min</span>
                    </span>
                  </label>
                  <label classname="items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-lg flex p-4 border-2
                  border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-100
                  dark:hover:bg-neutral-750 transition-colors has-[:checked]:border-neutral-800
                  has-[:checked]:dark:border-neutral-200">
                    <input name="timeGrouping" value="30" type="radio" classname="sr-only peer" />
                    <span classname="text-center">
                      <span classname="text-lg font-bold text-gray-800 block dark:text-neutral-200">30</span>
                      <span classname="text-xs text-gray-500 mt-1 block dark:text-neutral-400">min</span>
                    </span>
                  </label>
                  <label classname="items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-lg flex p-4 border-2
                  border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-100
                  dark:hover:bg-neutral-750 transition-colors has-[:checked]:border-neutral-800
                  has-[:checked]:dark:border-neutral-200">
                    <input name="timeGrouping" value="60" type="radio" classname="sr-only peer" />
                    <span classname="text-center">
                      <span classname="text-lg font-bold text-gray-800 block dark:text-neutral-200">60</span>
                      <span classname="text-xs text-gray-500 mt-1 block dark:text-neutral-400">min</span>
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <label classname="text-sm font-semibold text-gray-800 mb-3 block dark:text-neutral-200">Timeline Start
                Date</label>
                <input value="2023-12-31" type="date" classname="border border-neutral-300 dark:border-neutral-700
                dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600
                focus:border-transparent transition-all w-full px-4 py-3 bg-white dark:bg-neutral-800 rounded-lg
                text-gray-800" />
              </div>
              <div>
                <label classname="text-sm font-semibold text-gray-800 mb-3 block dark:text-neutral-200">Timeline Start Time
                (24-hour format)</label>
                <input value="00:00" type="time" classname="border border-neutral-300 dark:border-neutral-700
                dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600
                focus:border-transparent transition-all w-full px-4 py-3 bg-white dark:bg-neutral-800 rounded-lg
                text-gray-800" />
              </div>
              <div classname="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-5 border border-neutral-200
              dark:border-neutral-700">
                <div classname="items-start flex space-x-3">
                  <div classname="mt-1 flex-shrink-0">
                    <svg class="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="Windframe_4dVGKS8ca">
                                    <path strokelinecap="round" strokelinejoin="round" strokewidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                  </div>
                  <div classname="flex-1">
                    <p classname="text-sm font-semibold text-gray-800 mb-1 dark:text-neutral-200">Timeline Preview</p>
                    <p classname="text-xs text-gray-600 dark:text-neutral-400">
                      <span classname="font-semibold text-gray-800 dark:text-neutral-200">00:00</span>
                      <span classname="font-semibold text-gray-800 dark:text-neutral-200">December 31, 2023</span>
                      <span classname="font-semibold text-gray-800 dark:text-neutral-200">5-minute</span>
                      <span>with events grouped in</span>
                      <span>intervals.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div classname="px-6 py-4 bg-neutral-50 dark:bg-neutral-800 sm:flex-row sm:items-center sm:justify-between border-t
          border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
            <div classname="text-xs text-gray-500 dark:text-neutral-400">
              Last updated:
              <span classname="font-medium text-gray-700 dark:text-neutral-300">December 31, 2023 at 00:00</span>
            </div>
            <div classname="items-center flex gap-3">
              <button type="submit" classname="dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600
              hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500
              dark:focus:ring-neutral-600 transition-all px-5 py-2.5 text-sm font-medium text-gray-700 bg-white
              dark:bg-neutral-700 rounded-lg">Reset</button>
              <button type="submit" classname="dark:text-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-300
              focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 transition-all px-5
              py-2.5 text-sm font-medium text-white bg-neutral-800 dark:bg-neutral-200 rounded-lg">Apply
              Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div classname="min-h-screen bg-brand-surface">
      <div classname="mx-auto w-full px-4 pb-16 pt-10 sm:px-6 flex min-h-screen max-w-timeline flex-col">
        <header classname="mb-8 space-y-3">
          <div classname="items-center flex gap-3">
            <img alt="BirdSong.DIY Logo" src="https://app.windframe.dev/img/mac512pt2x.png" classname="h-8 w-8 sm:h-10 sm:w-10" />
            <span classname="text-xs tracking-[0.4em] font-logo uppercase text-brand-lagoon">BirdSong.DIY</span>
          </div>
          <p classname="text-3xl leading-tight text-brand-navy">Detection Timeline</p>
          <p classname="text-sm text-brand-muted">Private development build showing recent detections from your local
          monitors.</p>
        </header>
        <main classname="flex-1 space-y-6">
          <div></div>
        </main>
        <footer classname="mt-12 text-center text-xs text-brand-muted">Local-only environment · Phase 1 preview</footer>
      </div>
    </div>
  
);

export default IndexPage;