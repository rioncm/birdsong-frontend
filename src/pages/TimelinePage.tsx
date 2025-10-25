import { useMemo } from "react";

import { TimelineBucketCard } from "../components/TimelineBucketCard";
import { useQuarterPresets, useTimeline } from "../hooks/useTimeline";

export function TimelinePage(): JSX.Element {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useTimeline();
  const { data: quarters } = useQuarterPresets();

  const flattenedBuckets = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.pages.flatMap((page) => page.buckets);
  }, [data]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-brand-border bg-white px-5 py-4 shadow-card">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">Current Quarter</h2>
        <p className="mt-2 text-base font-heading text-brand-navy">
          {quarters?.current_label
            ? `${quarters.current_label} · ${quarters.date}`
            : "Quarter data loading…"}
        </p>
        <p className="mt-1 text-sm text-brand-muted">
          Timeline buckets are grouped in 5-minute windows. Species entries consolidate repeated detections for easier scanning.
        </p>
      </section>

      {isLoading && <p className="text-sm text-brand-muted">Loading detections…</p>}
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
            No detections have been recorded yet today. Check back after the next capture cycle.
          </p>
        )}
      </div>
    </div>
  );
}
