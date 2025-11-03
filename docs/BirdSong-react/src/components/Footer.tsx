import React from "react";

const Footer: React.FC = () => (
  <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800 sm:flex-row sm:items-center sm:justify-between border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
    <div className="text-xs text-gray-500 dark:text-neutral-400">
      Last updated:
      <span className="font-medium text-gray-700 dark:text-neutral-300">December 31, 2023 at 00:00</span>
    </div>
    <div className="items-center flex gap-3">
      <button type="submit" className="dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 transition-all px-5 py-2.5 text-sm font-medium text-gray-700 bg-white dark:bg-neutral-700 rounded-lg">Reset</button>
      <button type="submit" className="dark:text-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 transition-all px-5 py-2.5 text-sm font-medium text-white bg-neutral-800 dark:bg-neutral-200 rounded-lg">Apply Settings</button>
    </div>
  </div>
);

export default Footer;
