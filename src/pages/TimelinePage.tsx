import { useMemo, useState } from "react";

import { TimelineBucketCard } from "../components/TimelineBucketCard";
import { TimelineSettings, type TimelineSettingsValue } from "../components/TimelineSettings";
import { useQuarterPresets, useTimeline } from "../hooks/useTimeline";
import { useUserPreferences } from "../hooks/useUserPreferences";

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
  const { preferences, updateTimeline } = useUserPreferences();
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  const timelineSettingsValue: TimelineSettingsValue = useMemo(
    () => ({
      bucketMinutes: preferences.timeline.bucketMinutes,
      startCursor: preferences.timeline.startCursor ?? undefined,
      playbackFilter: preferences.timeline.playbackFilter
    }),
    [preferences.timeline.bucketMinutes, preferences.timeline.startCursor, preferences.timeline.playbackFilter]
  );

  const quartersDateParam = useMemo(
    () => formatDateParam(timelineSettingsValue.startCursor),
    [timelineSettingsValue.startCursor]
  );

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useTimeline({
    bucketMinutes: timelineSettingsValue.bucketMinutes,
    startCursor: timelineSettingsValue.startCursor,
    playbackFilter: timelineSettingsValue.playbackFilter
  });

  const { data: quarters } = useQuarterPresets(quartersDateParam);

  const flattenedBuckets = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.pages.flatMap((page) => page.buckets);
  }, [data]);

  const handleApplySettings = (nextValue: TimelineSettingsValue) => {
    updateTimeline({
      bucketMinutes: nextValue.bucketMinutes,
      startCursor: nextValue.startCursor ?? null,
      playbackFilter: nextValue.playbackFilter
    });
    setSettingsOpen(false);
  };

  const summaryText = useMemo(() => {
    const filterLabel =
      timelineSettingsValue.playbackFilter === "enhanced"
        ? "Enhanced playback"
        : "Original playback";
    if (!timelineSettingsValue.startCursor) {
      return `Showing the latest detections in ${timelineSettingsValue.bucketMinutes}-minute buckets. ${filterLabel}.`;
    }

    const local = new Date(timelineSettingsValue.startCursor);
    if (Number.isNaN(local.getTime())) {
      return `Showing the latest detections in ${timelineSettingsValue.bucketMinutes}-minute buckets. ${filterLabel}.`;
    }

    return `Anchored at ${local.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    })} in ${timelineSettingsValue.bucketMinutes}-minute buckets. ${filterLabel}.`;
  }, [timelineSettingsValue.bucketMinutes, timelineSettingsValue.startCursor, timelineSettingsValue.playbackFilter]);

  return (
    <div className="space-y-5">
      <section className="card-shell p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-muted">Current Range</p>
            <p className="mt-2 text-lg font-bold text-brand-accentBlue">
              {quarters?.current_label ? `${quarters.current_label} - ${quarters.date}` : "Quarter data loading..."}
            </p>
            <p className="mt-1 text-sm text-brand-muted">{summaryText}</p>

            {quarters?.quarters?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {quarters.quarters.map((window) => {
                  const isCurrent = window.label === quarters.current_label;
                  return (
                    <span
                      key={`${window.label}-${window.start}`}
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-semibold",
                        isCurrent
                          ? "border-brand-accentBlue bg-brand-chip text-brand-accentBlue"
                          : "border-brand-borderSubtle bg-brand-card text-brand-muted"
                      ].join(" ")}
                    >
                      {window.label}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-brand-borderSubtle bg-brand-card px-4 py-2 text-sm font-semibold text-brand-accentBlue shadow-cardSm transition hover:bg-brand-page focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus"
            aria-label="Open timeline settings"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0A1.724 1.724 0 0016.248 5.38c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35A1.724 1.724 0 005.38 7.747c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.573-1.06z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Settings
          </button>
        </div>
      </section>

      {isLoading && !data && (
        <p className="rounded-2xl border border-brand-borderSubtle bg-brand-card px-4 py-3 text-sm text-brand-muted">
          Loading detections...
        </p>
      )}

      {error && (
        <p className="rounded-2xl border border-brand-accentRed/40 bg-brand-accentRed/10 px-4 py-3 text-sm text-brand-accentRed">
          Unable to load detections. Confirm the backend API is reachable and try again.
        </p>
      )}

      <div className="space-y-4">
        {flattenedBuckets.map((bucket) => (
          <TimelineBucketCard
            key={`${bucket.bucket_start ?? "unknown"}-${bucket.bucket_end ?? "open"}`}
            bucket={bucket}
            playbackFilter={timelineSettingsValue.playbackFilter}
          />
        ))}
      </div>

      <div className="flex justify-center pt-1">
        {hasNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            className="rounded-full bg-brand-accentBlue px-6 py-2 text-sm font-semibold text-white shadow-cardSm transition hover:bg-brand-accentTeal disabled:opacity-60"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load earlier windows"}
          </button>
        )}

        {!hasNextPage && flattenedBuckets.length > 0 && (
          <p className="text-xs font-medium text-brand-muted">No older detections available.</p>
        )}

        {!isLoading && !error && flattenedBuckets.length === 0 && (
          <p className="rounded-2xl border border-brand-borderSubtle bg-brand-card px-4 py-3 text-center text-sm text-brand-muted">
            No detections have been recorded yet. Check again after the next capture cycle.
          </p>
        )}
      </div>

      <TimelineSettings
        isOpen={isSettingsOpen}
        value={timelineSettingsValue}
        onApply={handleApplySettings}
        onClose={() => setSettingsOpen(false)}
        isApplying={isLoading && !data}
      />
    </div>
  );
}
