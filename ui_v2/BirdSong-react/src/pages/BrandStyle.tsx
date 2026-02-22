import React from "react";

const BrandStylePage: React.FC = () =&gt; (
  &lt;&gt;
    <div classname="text-[rgb(17,24,39)] bg-[rgb(246,247,251)] dark:bg-[rgb(2,6,23)] dark:text-[rgb(249,250,251)] min-h-screen">
      <header classname="px-6 py-4 bg-[rgb(36,56,91)] dark:bg-[rgb(2,6,23)] border-b border-[rgb(209,213,219)]
      dark:border-[rgb(31,41,55)]">
        <div classname="mx-auto items-center justify-between max-w-7xl flex">
          <p classname="text-2xl font-bold text-[rgb(255,255,255)]">Custom CSS Theme</p>
          <nav classname="md:flex items-center hidden gap-6">
            <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(255,255,255)] hover:text-[rgb(185,226,74)]
            transition-colors">Home</a>
            <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(255,255,255)] hover:text-[rgb(185,226,74)]
            transition-colors">About</a>
            <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(255,255,255)] hover:text-[rgb(185,226,74)]
            transition-colors">Services</a>
            <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(255,255,255)] hover:text-[rgb(185,226,74)]
            transition-colors">Contact</a>
          </nav>
        </div>
      </header>
      <main classname="mx-auto px-6 py-8 max-w-7xl">
        <section classname="mb-8">
          <p classname="text-3xl font-bold mb-6">Custom CSS Variables Implementation</p>
          <div classname="rounded-lg mb-6 bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
          dark:border-[rgb(31,41,55)] p-6">
            <div classname="px-4 py-3 rounded-t-lg mb-6 bg-[rgb(237,242,255)] dark:bg-[rgb(15,23,42)] -mx-6 -mt-6">
              <p classname="text-xl font-semibold">Theme Overview</p>
            </div>
            <p classname="text-[rgb(75,85,99)] mb-4 dark:text-[rgb(156,163,175)]">This design showcases the custom CSS variables
              defined in the theme.css file, implementing both light and dark mode support with Tailwind CSS utility
              classes.</p>
            <div classname="flex flex-wrap gap-3">
              <span classname="text-[rgb(17,24,39)] px-4 py-2 rounded-full bg-[rgb(229,245,255)] dark:bg-[rgb(2,44,34)]
              dark:text-[rgb(249,250,251)] text-sm">Responsive</span>
              <span classname="text-[rgb(17,24,39)] px-4 py-2 rounded-full bg-[rgb(229,245,255)] dark:bg-[rgb(2,44,34)]
              dark:text-[rgb(249,250,251)] text-sm">Modern</span>
              <span classname="text-[rgb(17,24,39)] px-4 py-2 rounded-full bg-[rgb(229,245,255)] dark:bg-[rgb(2,44,34)]
              dark:text-[rgb(249,250,251)] text-sm">Accessible</span>
            </div>
          </div>
        </section>
        <section classname="mb-8">
          <p classname="text-2xl font-bold mb-6">Color Palette - BirdSong Spectrum</p>
          <div classname="md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-6">
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <div classname="h-32 items-center justify-center bg-[rgb(46,70,130)] flex">
                <span classname="text-[rgb(255,255,255)] font-semibold">Accent Blue</span>
              </div>
              <div classname="p-4">
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">#2E4682</p>
              </div>
            </div>
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <div classname="h-32 items-center justify-center bg-[rgb(92,151,171)] flex">
                <span classname="text-[rgb(255,255,255)] font-semibold">Accent Teal</span>
              </div>
              <div classname="p-4">
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">#5C97AB</p>
              </div>
            </div>
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <div classname="h-32 items-center justify-center bg-[rgb(121,171,89)] flex">
                <span classname="text-[rgb(255,255,255)] font-semibold">Accent Green</span>
              </div>
              <div classname="p-4">
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">#79AB59</p>
              </div>
            </div>
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <div classname="h-32 items-center justify-center bg-[rgb(241,151,67)] flex">
                <span classname="text-[rgb(255,255,255)] font-semibold">Accent Gold</span>
              </div>
              <div classname="p-4">
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">#F19743</p>
              </div>
            </div>
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <div classname="h-32 items-center justify-center bg-[rgb(185,226,74)] flex">
                <span classname="text-[rgb(17,24,39)] font-semibold">Accent Lime</span>
              </div>
              <div classname="p-4">
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">#B9E24A</p>
              </div>
            </div>
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <div classname="h-32 items-center justify-center bg-[rgb(212,65,48)] flex">
                <span classname="text-[rgb(255,255,255)] font-semibold">Accent Red</span>
              </div>
              <div classname="p-4">
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">#D44130</p>
              </div>
            </div>
          </div>
        </section>
        <section classname="mb-8">
          <p classname="text-2xl font-bold mb-6">Form Elements</p>
          <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
          dark:border-[rgb(31,41,55)] p-6">
            <form classname="space-y-6">
              <div>
                <label classname="text-sm font-medium mb-2 block">Full Name</label>
                <input type="text" placeholder="Enter your name" classname="bg-[rgb(249,250,251)] dark:bg-[rgb(2,6,23)] border
                border-[rgb(209,213,219)] dark:border-[rgb(31,41,55)] focus:outline-none focus:border-[rgb(56,189,248)]
                focus:ring-2 focus:ring-[rgb(56,189,248)] focus:ring-opacity-20 transition-all w-full rounded-lg px-4
                py-3" />
              </div>
              <div>
                <label classname="text-sm font-medium mb-2 block">Email Address</label>
                <input type="email" placeholder="your@email.com" classname="bg-[rgb(249,250,251)] dark:bg-[rgb(2,6,23)] border
                border-[rgb(209,213,219)] dark:border-[rgb(31,41,55)] focus:outline-none focus:border-[rgb(56,189,248)]
                focus:ring-2 focus:ring-[rgb(56,189,248)] focus:ring-opacity-20 transition-all w-full rounded-lg px-4
                py-3" />
              </div>
              <div>
                <label classname="text-sm font-medium mb-2 block">Message</label>
                <textarea rows="4" placeholder="Write your message here..." classname="w-full rounded-lg px-4
                py-3 bg-[rgb(249,250,251)] dark:bg-[rgb(2,6,23)] border border-[rgb(209,213,219)]
                dark:border-[rgb(31,41,55)] focus:outline-none focus:border-[rgb(56,189,248)] focus:ring-2
                focus:ring-[rgb(56,189,248)] focus:ring-opacity-20 transition-all resize-none"></textarea>
              </div>
              <button type="submit" classname="bg-[rgb(46,70,130)] hover:bg-[rgb(92,151,171)] transition-colors
              text-[rgb(255,255,255)] px-6 py-3 rounded-lg font-medium">Submit Form</button>
            </form>
          </div>
        </section>
        <section classname="mb-8">
          <p classname="text-2xl font-bold mb-6">Image Gallery</p>
          <div classname="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-6">
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <img alt="Placeholder 1" src="https://placehold.co/400x300/2E4682/FFFFFF?text=Image+1" classname="object-cover
              w-full h-48" />
              <div classname="p-4">
                <p classname="font-semibold mb-2">Gallery Item 1</p>
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">Description of the image</p>
              </div>
            </div>
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <img alt="Placeholder 2" src="https://placehold.co/400x300/5C97AB/FFFFFF?text=Image+2" classname="object-cover
              w-full h-48" />
              <div classname="p-4">
                <p classname="font-semibold mb-2">Gallery Item 2</p>
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">Description of the image</p>
              </div>
            </div>
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <img alt="Placeholder 3" src="https://placehold.co/400x300/79AB59/FFFFFF?text=Image+3" classname="object-cover
              w-full h-48" />
              <div classname="p-4">
                <p classname="font-semibold mb-2">Gallery Item 3</p>
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">Description of the image</p>
              </div>
            </div>
            <div classname="rounded-lg bg-[rgb(255,255,255)] dark:bg-[rgb(5,8,22)] border border-[rgb(209,213,219)]
            dark:border-[rgb(31,41,55)] overflow-hidden">
              <img alt="Placeholder 4" src="https://placehold.co/400x300/F19743/FFFFFF?text=Image+4" classname="object-cover
              w-full h-48" />
              <div classname="p-4">
                <p classname="font-semibold mb-2">Gallery Item 4</p>
                <p classname="text-sm text-[rgb(75,85,99)] dark:text-[rgb(156,163,175)]">Description of the image</p>
              </div>
            </div>
          </div>
        </section>
        <section classname="mb-8 rounded-lg bg-[rgb(233,237,247)] dark:bg-[rgb(5,8,22)] p-8">
          <div classname="mx-auto text-center max-w-3xl">
            <p classname="text-3xl font-bold mb-4">Ready to Get Started?</p>
            <p classname="text-[rgb(75,85,99)] mb-6 dark:text-[rgb(156,163,175)]">Join us today and experience the power of
              custom themed designs with full light and dark mode support.</p>
            <div classname="sm:flex-row justify-center flex flex-col gap-4">
              <button type="submit" classname="bg-[rgb(46,70,130)] hover:bg-[rgb(92,151,171)] transition-colors
              text-[rgb(255,255,255)] px-8 py-3 rounded-lg font-medium">Get Started</button>
              <button type="submit" classname="bg-[rgb(255,255,255)] dark:bg-[rgb(15,23,42)] border-2 border-[rgb(156,163,175)]
              dark:border-[rgb(75,85,99)] hover:border-[rgb(46,70,130)] dark:hover:border-[rgb(92,151,171)]
              transition-colors px-8 py-3 rounded-lg font-medium">Learn More</button>
            </div>
          </div>
        </section>
      </main>
      <footer classname="px-6 py-8 mt-12 bg-[rgb(36,56,91)] dark:bg-[rgb(2,6,23)] border-t border-[rgb(209,213,219)]
      dark:border-[rgb(31,41,55)]">
        <div classname="mx-auto max-w-7xl">
          <div classname="md:grid-cols-4 mb-8 grid grid-cols-1 gap-8">
            <div>
              <p classname="text-[rgb(255,255,255)] font-semibold mb-4">About</p>
              <ul classname="space-y-2">
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Company</a>
                </li>
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Team</a>
                </li>
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Careers</a>
                </li>
              </ul>
            </div>
            <div>
              <p classname="text-[rgb(255,255,255)] font-semibold mb-4">Resources</p>
              <ul classname="space-y-2">
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Documentation</a>
                </li>
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Guides</a>
                </li>
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">API</a>
                </li>
              </ul>
            </div>
            <div>
              <p classname="text-[rgb(255,255,255)] font-semibold mb-4">Support</p>
              <ul classname="space-y-2">
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Help Center</a>
                </li>
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Contact</a>
                </li>
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Status</a>
                </li>
              </ul>
            </div>
            <div>
              <p classname="text-[rgb(255,255,255)] font-semibold mb-4">Legal</p>
              <ul classname="space-y-2">
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Privacy</a>
                </li>
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Terms</a>
                </li>
                <li>
                  <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-[rgb(156,163,175)] hover:text-[rgb(185,226,74)]
                  transition-colors">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div classname="pt-6 text-center border-t border-[rgb(75,85,99)] dark:border-[rgb(31,41,55)]">
            <p classname="text-[rgb(156,163,175)] text-sm">© 2024 Custom CSS Theme. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  
);

export default BrandStylePage;