import { useEffect, useState } from "react";

import type { TimelineBucket } from "../api/types";

const SUMMARY_PREVIEW_LIMIT = 160;

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
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [expandedSummaries, setExpandedSummaries] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [lightboxImage]);

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
        {bucket.detections.map((detection, index) => {
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
          const detectionKey = detection.id ? String(detection.id) : `${speciesName}-${index}`;
          const summary = detection.species.summary?.trim();
          const isExpanded = !!expandedSummaries[detectionKey];
          const needsTruncation = summary ? summary.length > SUMMARY_PREVIEW_LIMIT : false;
          const summaryPreview = summary && needsTruncation && !isExpanded
            ? summary.slice(0, SUMMARY_PREVIEW_LIMIT).trimEnd()
            : summary;

          return (
            <li
              key={`${detection.id}-${speciesName}`}
              className="flex gap-3 rounded-3xl border border-brand-border bg-brand-surface px-4 py-3"
            >
              {detection.species.image_url ? (
                <button
                  type="button"
                  onClick={() => setLightboxImage({ src: detection.species.image_url ?? "", alt: speciesName })}
                  className="group relative h-16 w-16 overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lagoon"
                >
                  <img
                    src={detection.species.image_url}
                    alt={speciesName}
                    className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="sr-only">View larger image of {speciesName}</span>
                </button>
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

                {summaryPreview && (
                  <p className="text-sm leading-relaxed text-brand-text/90">
                    {summaryPreview}
                    {needsTruncation && !isExpanded && (
                      <>
                        {" "}
                        <button
                          type="button"
                          onClick={() => setExpandedSummaries((prev) => ({ ...prev, [detectionKey]: true }))}
                          className="font-semibold text-brand-lagoon underline underline-offset-4"
                          aria-label={`Show full summary for ${speciesName}`}
                        >
                          ...
                        </button>
                      </>
                    )}
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

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative w-full max-w-timeline"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close image preview"
            >
              ×
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-h-[80vh] w-full rounded-3xl object-contain"
            />
          </div>
        </div>
      )}
    </article>
  );
}
