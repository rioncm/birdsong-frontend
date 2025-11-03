import React from "react";

const TimelinePreview: React.FC = () => (
  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-5 border border-neutral-200 dark:border-neutral-700">
    <div className="items-start flex space-x-3">
      <div className="mt-1 flex-shrink-0">
        <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="Windframe_4dVGKS8ca"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800 mb-1 dark:text-neutral-200">Timeline Preview</p>
        <p className="text-xs text-gray-600 dark:text-neutral-400">
          <span className="font-semibold text-gray-800 dark:text-neutral-200">00:00</span>
          <span className="font-semibold text-gray-800 dark:text-neutral-200">December 31, 2023</span>
          <span className="font-semibold text-gray-800 dark:text-neutral-200">5-minute</span>
          <span>with events grouped in</span>
          <span>intervals.</span>
        </p>
      </div>
    </div>
  </div>
);

export default TimelinePreview;
