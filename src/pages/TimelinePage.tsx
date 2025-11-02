import { useMemo, useState } from "react";

import { TimelineBucketCard } from "../components/TimelineBucketCard";
import { TimelineSettings, type TimelineSettingsValue } from "../components/TimelineSettings";
import { DEFAULT_BUCKET_MINUTES, useQuarterPresets, useTimeline } from "../hooks/useTimeline";

function formatDateParam(iso?: string | null): string | undefined {
  if (!iso) {
    return undefined;
  }
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function TimelinePage(): JSX.Element {
  const [settingsValue, setSettingsValue] = useState<TimelineSettingsValue>({
    bucketMinutes: DEFAULT_BUCKET_MINUTES,
    startCursor: undefined
  });
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  const quartersDateParam = useMemo(() => formatDateParam(settingsValue.startCursor), [settingsValue.startCursor]);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error
  } = useTimeline({
    bucketMinutes: settingsValue.bucketMinutes,
    startCursor: settingsValue.startCursor
  });
  const { data: quarters } = useQuarterPresets(quartersDateParam);

  const flattenedBuckets = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.pages.flatMap((page) => page.buckets);
  }, [data]);

  const handleApplySettings = (nextValue: TimelineSettingsValue) => {
    setSettingsValue(nextValue);
    setSettingsOpen(false);
  };

  const summaryText = useMemo(() => {
    if (!settingsValue.startCursor) {
      return `Showing the latest detections in ${settingsValue.bucketMinutes}-minute buckets.`;
    }
    const local = new Date(settingsValue.startCursor);
    const formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    });
    return `Anchored at ${formatter.format(local)} · ${settingsValue.bucketMinutes}-minute buckets.`;
  }, [settingsValue.bucketMinutes, settingsValue.startCursor]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-brand-border bg-white px-5 py-4 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Current Quarter</h2>
            <p className="mt-2 text-base font-heading text-brand-navy">
              {quarters?.current_label ? `${quarters.current_label} · ${quarters.date}` : "Quarter data loading…"}
            </p>
            <p className="mt-1 text-sm text-brand-muted">{summaryText}</p>
          </div>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-card-sm transition hover:bg-brand-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lagoon"
            aria-label="Open timeline settings"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-brand-navy"
            >
              <path
                d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM4.75 12a7.25 7.25 0 0 1 12.87-4.68l1.54-.89a.75.75 0 0 1 1.13.66v5.1a.75.75 0 0 1-.37.65l-4.41 2.55a.75.75 0 0 1-1.13-.65v-2.03a4.75 4.75 0 1 1-8.63-2.67ZM19.25 12v3.19a.75.75 0 0 1-1.13.66l-1.54-.9A7.25 7.25 0 0 1 4.75 12"
                fill="currentColor"
              />
            </svg>
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </section>

      {isLoading && !data && <p className="text-sm text-brand-muted">Loading detections…</p>}
      {error && (
        <p className="rounded-3xl border border-brand-sunset/40 bg-brand-sunset/10 px-4 py-3 text-sm text-brand-sunset">
          Unable to load detections. Please ensure the backend API is reachable and try again.
        </p>
      )}

      <div className="space-y-5">
        {flattenedBuckets.map((bucket) => (
          <TimelineBucketCard key={`${bucket.bucket_start ?? "unknown"}-${bucket.bucket_end ?? "open"}`} bucket={bucket} />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        {hasNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            className="rounded-full bg-brand-lagoon px-6 py-2 text-sm font-medium text-white shadow-card transition hover:bg-brand-navy disabled:opacity-60"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more…" : "Load earlier windows"}
          </button>
        )}
        {!hasNextPage && flattenedBuckets.length > 0 && (
          <p className="text-xs text-brand-muted">No older detections available.</p>
        )}
        {!isLoading && !error && flattenedBuckets.length === 0 && (
          <p className="rounded-3xl border border-brand-border bg-white px-4 py-3 text-center text-sm text-brand-muted">
            No detections have been recorded yet. Adjust the filters or check back after the next capture cycle.
          </p>
        )}
      </div>

      <TimelineSettings
        isOpen={isSettingsOpen}
        value={settingsValue}
        onApply={handleApplySettings}
        onClose={() => setSettingsOpen(false)}
        isApplying={isLoading && !data}
      />
    </div>
  );
}
