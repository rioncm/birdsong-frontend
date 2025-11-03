import React from "react";
import Container from "@/Container";

const Index: React.FC = () => {
  return (
    <Container>
      <div className="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-xl max-w-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="px-6 py-5 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
          <p className="text-2xl font-bold text-gray-900 dark:text-neutral-100">Timeline Settings</p>
          <p className="text-sm text-gray-600 mt-1 dark:text-neutral-400">Configure your timeline start date, time, and grouping interval</p>
        </div>
        <div className="px-6 py-8 space-y-8">
          <div className="space-y-6">
            <TimeGrouping />
            <TimelineStartDate />
            <TimelineStartTime />
            <TimelinePreview />
          </div>
        </div>
        <Footer />
      </div>
    </Container>
  );
};

export default Index;
