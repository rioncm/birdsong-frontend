import React from "react";

const LoginPage: React.FC = () =&gt; (
  &lt;&gt;
    <div classname="bg-white dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 antialiased">
      <div classname="items-center justify-center px-6 py-12 min-h-screen flex relative isolate">
        <div classname="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div classname="h-[60vh] w-[60vh] rounded-full bg-gradient-to-br absolute -top-32 -left-32 from-indigo-200
          via-lime-200 to-purple-300 opacity-20 blur-2xl dark:opacity-0"></div>
          <div classname="h-[40vh] w-[50vh] rounded-full bg-gradient-to-tr absolute -bottom-20 right-10 from-fuchsia-300
          via-orange-300 to-rose-200 opacity-40 blur-3xl dark:opacity-0"></div>
          <div classname="h-[35vh] w-[45vh] rounded-full bg-gradient-to-b dark:h-[28vh] absolute top-28 left-1/4 from-orange-300
          via-amber-200 to-rose-100 opacity-60 blur-3xl dark:from-orange-600 dark:via-amber-500 dark:to-rose-400
          dark:opacity-64"></div>
        </div>
        <div classname="w-full max-w-md">
          <div classname="bg-white/70 dark:bg-neutral-950 shadow-xl rounded-2xl ring-1 ring-neutral-200/50
          dark:ring-neutral-700/50 border border-neutral-200/70 dark:border-neutral-800/70 p-8">
            <div classname="text-center mb-8">
              <h1 classname="text-3xl font-bold text-gray-900 mb-2 dark:text-neutral-100">Welcome Back</h1>
              <p classname="text-gray-600 text-sm dark:text-neutral-400">Sign in to your account to continue</p>
            </div>
            <form classname="space-y-6">
              <div>
                <label htmlfor="username" classname="text-sm font-medium text-gray-700 mb-2 block
                dark:text-neutral-300">Username</label>
                <div classname="relative">
                  <div classname="pl-3 items-center absolute inset-y-0 left-0 flex pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="Windframe_Dc7mow4iu">
                  <path strokelinecap="round" strokelinejoin="round" strokewidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                  </div>
                  <input name="username" type="text" placeholder="Enter your username" classname="border border-neutral-300
                  dark:border-neutral-700 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-500
                  focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400
                  focus:border-transparent transition-all w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 rounded-lg
                  text-gray-900" id="username" />
                </div>
              </div>
              <div>
                <label htmlfor="password" classname="text-sm font-medium text-gray-700 mb-2 block
                dark:text-neutral-300">Password</label>
                <div classname="relative">
                  <div classname="pl-3 items-center absolute inset-y-0 left-0 flex pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="Windframe_VBn7EKbpw">
                  <path strokelinecap="round" strokelinejoin="round" strokewidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                  </div>
                  <input name="password" type="password" placeholder="Enter your password" classname="border border-neutral-300
                  dark:border-neutral-700 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-500
                  focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400
                  focus:border-transparent transition-all w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 rounded-lg
                  text-gray-900" id="password" />
                </div>
              </div>
              <div classname="items-center justify-between flex">
                <div classname="items-center flex">
                  <input name="remember" type="checkbox" classname="dark:text-neutral-100 border-neutral-300
                  dark:border-neutral-700 rounded focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 w-4
                  h-4 text-gray-900 bg-white dark:bg-neutral-900" id="remember" />
                  <label htmlfor="remember" classname="ml-2 text-sm text-gray-600 dark:text-neutral-400">Remember me</label>
                </div>
                <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="text-sm font-medium text-gray-700 dark:text-neutral-300
                hover:text-gray-900 dark:hover:text-neutral-100 transition-colors">Forgot password?</a>
              </div>
              <button type="submit" classname="dark:text-neutral-900 hover:bg-gray-800 dark:hover:bg-neutral-100
              focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:ring-offset-2
              focus:ring-offset-white dark:focus:ring-offset-neutral-950 transition-all transform hover:scale-[1.02]
              active:scale-[0.98] w-full bg-gray-900 dark:bg-neutral-100 text-white font-semibold py-3 px-4
              rounded-lg">Sign In</button>
            </form>
            <div classname="my-8 relative">
              <div classname="items-center absolute inset-0 flex">
                <div classname="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
              </div>
              <div classname="justify-center text-sm relative flex">
                <span classname="px-4 bg-white/70 dark:bg-neutral-950 text-gray-500 dark:text-neutral-400">Or continue
                with</span>
              </div>
            </div>
            <div classname="grid grid-cols-3 gap-3">
              <button type="button" classname="flex border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50
              dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500
              dark:focus:ring-neutral-400 transition-all transform hover:scale-105 active:scale-95 group items-center
              justify-center py-3 px-4 bg-white dark:bg-neutral-900 rounded-lg">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" id="Windframe_enQr09wWg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
              </button>
              <button type="button" classname="flex border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50
              dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500
              dark:focus:ring-neutral-400 transition-all transform hover:scale-105 active:scale-95 group items-center
              justify-center py-3 px-4 bg-white dark:bg-neutral-900 rounded-lg">
                <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24" id="Windframe_hi1Xk7VsY">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
            </svg>
              </button>
              <button type="button" classname="flex border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50
              dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500
              dark:focus:ring-neutral-400 transition-all transform hover:scale-105 active:scale-95 group items-center
              justify-center py-3 px-4 bg-white dark:bg-neutral-900 rounded-lg">
                <svg class="w-5 h-5 text-gray-900 dark:text-neutral-100" fill="currentColor" viewBox="0 0 24 24" id="Windframe_y81Ys3Q5B">
              <path fillrule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" cliprule="evenodd"></path>
            </svg>
              </button>
            </div>
            <div classname="mt-8 text-center">
              <p classname="text-sm text-gray-600 dark:text-neutral-400">
                Don't have an account?
                <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="font-medium text-gray-900 dark:text-neutral-100 hover:text-gray-700
                dark:hover:text-neutral-300 transition-colors">Sign up</a>
              </p>
            </div>
          </div>
          <div classname="mt-6 text-center">
            <p classname="text-xs text-gray-500 dark:text-neutral-500">
              <span>By signing in, you agree to our</span>
              <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="hover:text-gray-700 dark:hover:text-neutral-300
              transition-colors">Terms of Service</a>
              <span>and</span>
              <a href="/lTM5NDiyrQK16APQ2Z6h#" classname="hover:text-gray-700 dark:hover:text-neutral-300
              transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  
);

export default LoginPage;