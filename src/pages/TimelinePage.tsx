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
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Current Quarter</h2>
        <p className="mt-1 text-base text-slate-100">
          {quarters?.current_label
            ? `Viewing data for ${quarters.date} · ${quarters.current_label}`
            : "Quarter data loading…"}
        </p>
      </section>

      {isLoading && <p className="text-sm text-slate-400">Loading detections…</p>}
      {error && (
        <p className="text-sm text-red-400">
          Unable to load detections. Please check the backend status and try again.
        </p>
      )}

      <div className="space-y-4">
        {flattenedBuckets.map((bucket) => (
          <TimelineBucketCard key={`${bucket.bucket_start ?? "unknown"}-${bucket.bucket_end ?? "open"}`} bucket={bucket} />
        ))}
      </div>

      <div className="flex justify-center">
        {hasNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more…" : "Load older detections"}
          </button>
        )}
        {!hasNextPage && flattenedBuckets.length > 0 && (
          <p className="text-xs text-slate-500">No older detections available.</p>
        )}
      </div>
    </div>
  );
}
