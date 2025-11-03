import React from "react";

const TimelineStartTime: React.FC = () => (
  <div>
    <label className="text-sm font-semibold text-gray-800 mb-3 block dark:text-neutral-200">Timeline Start Time (24-hour format)</label>
    <input defaultValue="00:00" type="time" className="border border-neutral-300 dark:border-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 focus:border-transparent transition-all w-full px-4 py-3 bg-white dark:bg-neutral-800 rounded-lg text-gray-800" />
  </div>
);

export default TimelineStartTime;
