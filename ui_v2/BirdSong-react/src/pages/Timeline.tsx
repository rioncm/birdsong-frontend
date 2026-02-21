import React from "react";

const TimelinePage: React.FC = () =&gt; (
  &lt;&gt;
    <div classname="bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 font-sans">
      <header classname="bg-white dark:bg-stone-800 shadow-sm sticky top-0 z-50 border-b border-stone-200
      dark:border-stone-700">
        <div classname="mx-auto px-4 py-4 items-center justify-between container flex">
          <div classname="items-center flex gap-3">
            <img alt="Logo" src="https://placehold.co/40x40/6366f1/fff?text=B" classname="w-10 h-10" />
            <span classname="text-lg tracking-widest text-stone-600 font-light dark:text-stone-300">BIRDSONG.DIY</span>
          </div>
          <div classname="relative group">
            <button type="submit" classname="hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors px-4 py-2 bg-stone-100
            dark:bg-stone-700 rounded-md">Menu</button>
            <div classname="mt-2 w-48 bg-white dark:bg-stone-700 rounded-md shadow-lg absolute right-0 border border-stone-200
            dark:border-stone-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-4 py-2 rounded-t-md block hover:bg-stone-100
              dark:hover:bg-stone-600">Home</a>
              <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-4 py-2 block hover:bg-stone-100
              dark:hover:bg-stone-600">Timeline</a>
              <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-4 py-2 block hover:bg-stone-100
              dark:hover:bg-stone-600">Settings</a>
              <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-4 py-2 rounded-b-md block hover:bg-stone-100
              dark:hover:bg-stone-600">About</a>
            </div>
          </div>
        </div>
      </header>
      <main classname="mx-auto px-4 py-8 container max-w-2xl">
        <div classname="mb-6">
          <p classname="text-3xl font-light text-stone-700 mb-3 dark:text-stone-200">Identifications&nbsp;</p>
          <p classname="text-stone-600 dark:text-stone-400">Private development build showing recent detections from your local
          monitors.</p>
        </div>
        <div classname="bg-white dark:bg-stone-800 rounded-lg shadow-md mb-6 p-6 border border-stone-200 dark:border-stone-700">
          <div classname="mb-4">
            <p classname="text-xs tracking-widest text-stone-500 mb-2 uppercase dark:text-stone-400">CURRENT RANGE</p>
            <p classname="text-lg text-stone-700 mb-3 dark:text-stone-200">2025-11-15&nbsp;</p>
            <p classname="text-stone-600 mb-4 dark:text-stone-400">Showing the latest detections in 60-minute buckets.</p>
          </div>
          <button type="submit" classname="inline-flex gap-2 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-600
          transition-colors items-center px-4 py-2 bg-stone-100 dark:bg-stone-700 text-stone-700 rounded-md">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="Windframe_B3uJ1wmoi">
          <path strokelinecap="round" strokelinejoin="round" strokewidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokelinecap="round" strokelinejoin="round" strokewidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
            Settings
          </button>
        </div>
        <div classname="bg-white dark:bg-stone-800 rounded-t-lg shadow-md p-4 border border-stone-200 dark:border-stone-700
        border-b-0">
          <p classname="text-sm text-stone-600 mb-1 dark:text-stone-400">04:00 AM - 05:00 AM UTC</p>
          <p classname="text-lg font-medium text-stone-700 dark:text-stone-200">3 species · 5 detections</p>
          <span classname="mt-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 text-xs rounded-full inline-block
          dark:text-green-300">Multi-species</span>
        </div>
        <div classname="bg-stone-50 dark:bg-stone-850 rounded-b-lg shadow-md border border-stone-200 dark:border-stone-700
        border-t-0 p-4 space-y-4">
          <div classname="bg-white dark:bg-stone-800 rounded-lg p-4 border border-stone-200 dark:border-stone-700">
            <div classname="flex gap-4">
              <div classname="flex-shrink-0 relative group cursor-pointer">
                <img alt="Great-tailed Grackle" src="https://placehold.co/80x80/4a5568/fff?text=Bird" classname="object-cover
                w-20 h-20 rounded-lg" />
                <div classname="bg-black rounded-lg items-center justify-center absolute inset-0 bg-opacity-0
                group-hover:bg-opacity-30 transition-all flex">
                  <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="Windframe_CdtekDO4Z">
                <path strokelinecap="round" strokelinejoin="round" strokewidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
              </svg>
                </div>
              </div>
              <div classname="flex-1">
                <p classname="text-lg font-medium text-stone-800 mb-1 dark:text-stone-100">Great-tailed Grackle</p>
                <p italic="" classname="text-sm text-stone-600 mb-2 dark:text-stone-400">QUISCALUS MEXICANUS</p>
                <div classname="items-center mb-2 flex gap-3">
                  <span classname="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 text-xs dark:text-amber-300
                  rounded">1 detection</span>
                  <span classname="text-sm text-stone-700 font-medium dark:text-stone-300">60% confidence</span>
                </div>
                <p classname="text-xs text-stone-500 mb-3 dark:text-stone-400">Latest 04:47 AM · South Side</p>
                <div classname="relative">
                  <p classname="text-sm text-stone-700 leading-relaxed mb-2 dark:text-stone-300">The great-tailed grackle or
                  Mexican grackle is a medium-sized, highly social passerine bird native to North and South America. A
                  member of the family Icteridae, ...</p>
                  <div classname="items-center flex gap-4">
                    <div classname="items-center flex gap-2">
                      <span classname="text-sm text-stone-600 dark:text-stone-400">Clip:</span>
                      <span classname="text-sm text-stone-700 dark:text-stone-300">20251115_124644</span>
                    </div>
                    <div classname="relative group">
                      <button type="submit" classname="dark:text-blue-400 hover:underline text-sm text-blue-600">Learn
                      more</button>
                      <div classname="mt-1 w-40 bg-white dark:bg-stone-700 rounded-md shadow-lg absolute left-0 border
                      border-stone-200 dark:border-stone-600 opacity-0 invisible group-hover:opacity-100
                      group-hover:visible transition-all z-10">
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm rounded-t-md block hover:bg-stone-100
                        dark:hover:bg-stone-600">View Details</a>
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm block hover:bg-stone-100
                        dark:hover:bg-stone-600">Play Clip</a>
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm rounded-b-md block hover:bg-stone-100
                        dark:hover:bg-stone-600">Share</a>
                      </div>
                    </div>
                    <div classname="ml-auto relative group">
                      <button type="submit" classname="p-1 hover:bg-stone-100 dark:hover:bg-stone-700 rounded">
                        <svg class="w-5 h-5 text-stone-600 dark:text-stone-400" fill="currentColor" viewBox="0 0 20 20" id="Windframe_haHVChevT">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                      </button>
                      <div classname="mt-1 w-40 bg-white dark:bg-stone-700 rounded-md shadow-lg absolute right-0 border
                      border-stone-200 dark:border-stone-600 opacity-0 invisible group-hover:opacity-100
                      group-hover:visible transition-all z-10">
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm rounded-t-md block hover:bg-stone-100
                        dark:hover:bg-stone-600">Listen</a>
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm block hover:bg-stone-100
                        dark:hover:bg-stone-600">Learn More</a>
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm rounded-b-md block hover:bg-stone-100
                        dark:hover:bg-stone-600">Notify Me</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div classname="bg-white dark:bg-stone-800 rounded-lg p-4 border border-stone-200 dark:border-stone-700">
            <div classname="flex gap-4">
              <div classname="flex-shrink-0 relative group cursor-pointer">
                <img alt="Ash-throated Flycatcher" src="https://placehold.co/80x80/6366f1/fff?text=Bird" classname="object-cover
                w-20 h-20 rounded-lg" />
                <div classname="bg-black rounded-lg items-center justify-center absolute inset-0 bg-opacity-0
                group-hover:bg-opacity-30 transition-all flex">
                  <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="Windframe_FdptRGMC9">
                <path strokelinecap="round" strokelinejoin="round" strokewidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
              </svg>
                </div>
              </div>
              <div classname="flex-1">
                <p classname="text-lg font-medium text-stone-800 mb-1 dark:text-stone-100">Ash-throated Flycatcher</p>
                <p italic="" classname="text-sm text-stone-600 mb-2 dark:text-stone-400">MYIARCHUS CINERASCENS</p>
                <div classname="items-center mb-2 flex gap-3">
                  <span classname="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 text-xs dark:text-amber-300
                  rounded">2 detections</span>
                  <span classname="text-sm text-stone-700 font-medium dark:text-stone-300">36% confidence</span>
                </div>
                <p classname="text-xs text-stone-500 mb-3 dark:text-stone-400">Latest 04:17 AM · South Side</p>
                <div classname="relative">
                  <p classname="text-sm text-stone-700 leading-relaxed mb-2 dark:text-stone-300">The ash-throated flycatcher is
                  a passerine bird in the tyrant flycatcher family.</p>
                  <div classname="items-center flex gap-4">
                    <div classname="items-center flex gap-2">
                      <span classname="text-sm text-stone-600 dark:text-stone-400">Clip:</span>
                      <span classname="text-sm text-stone-700 dark:text-stone-300">20251115_121712</span>
                    </div>
                    <div classname="relative group">
                      <button type="submit" classname="dark:text-blue-400 hover:underline text-sm text-blue-600">Learn
                      more</button>
                      <div classname="mt-1 w-40 bg-white dark:bg-stone-700 rounded-md shadow-lg absolute left-0 border
                      border-stone-200 dark:border-stone-600 opacity-0 invisible group-hover:opacity-100
                      group-hover:visible transition-all z-10">
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm rounded-t-md block hover:bg-stone-100
                        dark:hover:bg-stone-600">View Details</a>
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm block hover:bg-stone-100
                        dark:hover:bg-stone-600">Play Clip</a>
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm rounded-b-md block hover:bg-stone-100
                        dark:hover:bg-stone-600">Share</a>
                      </div>
                    </div>
                    <div classname="ml-auto relative group">
                      <button type="submit" classname="p-1 hover:bg-stone-100 dark:hover:bg-stone-700 rounded">
                        <svg class="w-5 h-5 text-stone-600 dark:text-stone-400" fill="currentColor" viewBox="0 0 20 20" id="Windframe_hKOYZAtvX">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                      </button>
                      <div classname="mt-1 w-40 bg-white dark:bg-stone-700 rounded-md shadow-lg absolute right-0 border
                      border-stone-200 dark:border-stone-600 opacity-0 invisible group-hover:opacity-100
                      group-hover:visible transition-all z-10">
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm rounded-t-md block hover:bg-stone-100
                        dark:hover:bg-stone-600">Edit</a>
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm block hover:bg-stone-100
                        dark:hover:bg-stone-600">Flag</a>
                        <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="px-3 py-2 text-sm rounded-b-md block hover:bg-stone-100
                        dark:hover:bg-stone-600">Delete</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div classname="mb-12">
            <h2 classname="text-3xl font-bold text-gray-900 mb-8 dark:text-neutral-100">My Notifications</h2>
          </div>
        </div>
      </main>
      <footer classname="mt-12 bg-stone-800 dark:bg-stone-950 text-stone-300 py-8 dark:text-stone-400">
        <div classname="mx-auto px-4 text-center container">
          <p classname="text-sm mb-2">© 2025 BIRDSONG.DIY · Private Development Build</p>
          <p classname="text-xs text-stone-400 dark:text-stone-500">Detection monitoring system for local bird species</p>
        </div>
      </footer>
    </div>
  
);

export default TimelinePage;