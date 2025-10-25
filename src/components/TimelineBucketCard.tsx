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
    <article className="rounded-[28px] border border-brand-border bg-white px-5 py-4 shadow-card">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">{formatTimeRange(bucket.bucket_start, bucket.bucket_end)}</p>
          <h3 className="text-lg font-heading text-brand-navy">
            {bucket.unique_species} species · {bucket.total_detections} detections
          </h3>
        </div>
        <span className="rounded-full bg-brand-leaf/15 px-3 py-1 text-xs font-semibold text-brand-leaf">
          {bucket.unique_species > 1 ? "Multi-species" : "Single species"}
        </span>
      </header>
      <ul className="space-y-3">
        {bucket.detections.map((detection) => {
          const speciesName = detection.species.common_name ?? detection.species.scientific_name ?? "Unknown species";
          const scientific = detection.species.scientific_name ?? "";
          const recordedAt = detection.recorded_at ? new Date(detection.recorded_at) : undefined;
          const recordedLabel = recordedAt
            ? recordedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "Unknown time";
          const detectionCount = detection.detection_count ?? 1;
          const confidenceLabel = typeof detection.confidence === "number"
            ? `${Math.round(detection.confidence * 100)}%`
            : undefined;
          const infoHref = detection.species.info_url ?? "#";

          return (
            <li
              key={`${detection.id}-${speciesName}`}
              className="flex gap-3 rounded-3xl border border-brand-border bg-brand-surface px-4 py-3"
            >
              {detection.species.image_url ? (
                <img
                  src={detection.species.image_url}
                  alt={speciesName}
                  className="h-16 w-16 rounded-2xl object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-lagoon/10 text-sm font-semibold text-brand-lagoon">
                  {speciesName.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-heading text-brand-navy">{speciesName}</p>
                    {scientific && <p className="text-xs uppercase tracking-wide text-brand-muted">{scientific}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right">
                    <span className="rounded-full bg-brand-leaf/15 px-3 py-1 text-xs font-semibold text-brand-leaf">
                      {detectionCount} {detectionCount === 1 ? "detection" : "detections"}
                    </span>
                    {confidenceLabel && (
                      <span className="text-xs font-semibold text-brand-lagoon">{confidenceLabel} confidence</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-brand-muted">
                  Latest {recordedLabel} · {detection.device_display_name ?? detection.device_name ?? "Unknown source"}
                </p>

                {detection.species.summary && (
                  <p className="text-sm leading-relaxed text-brand-text/90">
                    {detection.species.summary}
                  </p>
                )}

                <div className="flex items-center justify-between pt-1 text-sm">
                  <span className="text-brand-muted">
                    Clip · {detection.recording.wav_id ?? "pending"}
                  </span>
                  <a
                    href={infoHref}
                    target={infoHref === "#" ? "_self" : "_blank"}
                    rel="noreferrer"
                    className="font-medium text-brand-lagoon underline underline-offset-4"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
