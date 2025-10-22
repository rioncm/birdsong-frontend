import type { TimelineBucket } from "../api/types";

interface TimelineBucketCardProps {
  bucket: TimelineBucket;
}

function formatTimeRange(start?: string | null, end?: string | null): string {
  if (!start || !end) {
    return "Unscheduled";
  }
  const startDate = new Date(start);
  const endDate = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
  return `${startDate.toLocaleTimeString([], opts)} – ${endDate.toLocaleTimeString([], opts)} UTC`;
}

export function TimelineBucketCard({ bucket }: TimelineBucketCardProps): JSX.Element {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm">
      <header className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-100">
          {formatTimeRange(bucket.bucket_start, bucket.bucket_end)}
        </h2>
        <span className="text-xs uppercase tracking-wide text-slate-500">
          {bucket.total_detections} detections · {bucket.unique_species} species
        </span>
      </header>
      <ul className="space-y-2">
        {bucket.detections.map((detection) => (
          <li key={detection.id} className="rounded-lg bg-slate-800/60 p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-slate-50">
                  {detection.species.common_name ?? detection.species.scientific_name ?? "Unknown species"}
                </p>
                <p className="text-xs text-slate-400">
                  {detection.species.scientific_name}
                </p>
              </div>
              {typeof detection.confidence === "number" && (
                <span className="rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-300">
                  {(detection.confidence * 100).toFixed(0)}%
                </span>
              )}
            </div>
            {detection.location_hint && (
              <p className="mt-1 text-xs text-slate-400">
                Captured at <strong className="text-slate-200">{detection.location_hint}</strong>
              </p>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
