import React from "react";

const TimelineStartDate: React.FC = () => (
  <div>
    <label className="text-sm font-semibold text-gray-800 mb-3 block dark:text-neutral-200">Timeline Start Date</label>
    <input defaultValue="2023-12-31" type="date" className="border border-neutral-300 dark:border-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 focus:border-transparent transition-all w-full px-4 py-3 bg-white dark:bg-neutral-800 rounded-lg text-gray-800" />
  </div>
);

export default TimelineStartDate;
