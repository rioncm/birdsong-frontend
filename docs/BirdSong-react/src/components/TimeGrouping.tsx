import React from "react";

const TimeGrouping: React.FC = () => {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-800 mb-3 block dark:text-neutral-200">Time Grouping (Minutes)</label>
      <div className="grid grid-cols-5 gap-3">
        {[5, 10, 20, 30, 60].map((value) => (
          <label key={value} className="items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-lg flex p-4 border-2 border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors has-[:checked]:border-neutral-800 has-[:checked]:dark:border-neutral-200">
            <input name="timeGrouping" value={value} type="radio" className="sr-only peer" defaultChecked={value === 5} />
            <span className="text-center">
              <span className="text-lg font-bold text-gray-800 block dark:text-neutral-200">{value}</span>
              <span className="text-xs text-gray-500 mt-1 block dark:text-neutral-400">min</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TimeGrouping;
