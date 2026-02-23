import { useEffect, useMemo, useState } from "react";

import type { DetectionItem, TimelineBucket } from "../api/types";
import type { PlaybackFilter } from "../services/userPreferences";
import { RecordingListenModal, type RecordingClip } from "./RecordingListenModal";

const SUMMARY_PREVIEW_LIMIT = 170;

interface TimelineBucketCardProps {
  bucket: TimelineBucket;
  playbackFilter: PlaybackFilter;
}

function formatBucketRange(start?: string | null, end?: string | null): string {
  if (!start || !end || start === "unspecified" || end === "unspecified") {
    return "Unscheduled window";
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return "Unscheduled window";
  }

  const opts: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit"
  };

  return `${startDate.toLocaleTimeString([], opts)} - ${endDate.toLocaleTimeString([], opts)}`;
}

function getSpeciesName(detection: DetectionItem): string {
  return detection.species.common_name ?? detection.species.scientific_name ?? "Unknown species";
}

function getClipKey(detection: DetectionItem, index: number): string {
  const primaryId = detection.id > 0 ? String(detection.id) : `idx-${index}`;
  const wavId = detection.recording.wav_id ?? "no-wav";
  return `${primaryId}-${wavId}`;
}

export function TimelineBucketCard({ bucket, playbackFilter }: TimelineBucketCardProps): JSX.Element {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [expandedSummaries, setExpandedSummaries] = useState<Record<string, boolean>>({});
  const [isListenOpen, setListenOpen] = useState<boolean>(false);
  const [listenIndex, setListenIndex] = useState<number>(0);

  const recordingClips = useMemo<RecordingClip[]>(() => {
    const clips: RecordingClip[] = [];
    bucket.detections.forEach((detection, index) => {
      const recordingUrl = detection.recording.url;
      const wavId = detection.recording.wav_id;
      if (!recordingUrl && !wavId) {
        return;
      }

      clips.push({
        key: getClipKey(detection, index),
        speciesName: getSpeciesName(detection),
        scientificName: detection.species.scientific_name,
        wavId,
        recordingUrl,
        recordedAt: detection.recorded_at,
        durationSeconds: detection.recording.duration_seconds,
        deviceDisplayName: detection.device_display_name ?? detection.device_name
      });
    });
    return clips;
  }, [bucket.detections]);

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

  const openListenModal = (detection: DetectionItem, index: number) => {
    const targetKey = getClipKey(detection, index);
    const nextIndex = recordingClips.findIndex((clip) => clip.key === targetKey);
    if (nextIndex < 0) {
      return;
    }
    setListenIndex(nextIndex);
    setListenOpen(true);
  };

  return (
    <article className="card-shell overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-borderSubtle bg-brand-cardHeader px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
            {formatBucketRange(bucket.bucket_start, bucket.bucket_end)}
          </p>
          <h3 className="mt-1 text-lg font-bold text-brand-accentBlue">
            {bucket.unique_species} species - {bucket.total_detections} detections
          </h3>
        </div>
        <span className="chip-quiet">
          {bucket.unique_species > 1 ? "Multi-species" : "Single species"}
        </span>
      </header>

      <ul className="space-y-3 px-3 py-3">
        {bucket.detections.map((detection, index) => {
          const speciesName = getSpeciesName(detection);
          const scientificName = detection.species.scientific_name?.toUpperCase();
          const recordedAt = detection.recorded_at ? new Date(detection.recorded_at) : null;
          const recordedLabel =
            recordedAt && !Number.isNaN(recordedAt.getTime())
              ? recordedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "Unknown time";

          const detectionCount = detection.detection_count ?? 1;
          const confidenceLabel =
            typeof detection.confidence === "number" ? `${Math.round(detection.confidence * 100)}% confidence` : null;
          const deviceLabel = detection.device_display_name ?? detection.device_name ?? "Unknown source";

          const infoHref = detection.species.info_url;
          const summary = detection.species.summary?.trim() ?? "";
          const summaryKey = getClipKey(detection, index);
          const isSummaryExpanded = Boolean(expandedSummaries[summaryKey]);
          const needsSummaryTruncate = summary.length > SUMMARY_PREVIEW_LIMIT;
          const visibleSummary =
            needsSummaryTruncate && !isSummaryExpanded
              ? `${summary.slice(0, SUMMARY_PREVIEW_LIMIT).trimEnd()}...`
              : summary;

          const hasPlayback = Boolean(detection.recording.url || detection.recording.wav_id);

          return (
            <li key={summaryKey} className="rounded-2xl border border-brand-borderSubtle bg-brand-page px-3 py-3">
              <div className="flex gap-3">
                {detection.species.image_url ? (
                  <button
                    type="button"
                    onClick={() => setLightboxImage({ src: detection.species.image_url ?? "", alt: speciesName })}
                    className="group relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus"
                  >
                    <img
                      src={detection.species.image_url}
                      alt={speciesName}
                      className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="sr-only">Preview image for {speciesName}</span>
                  </button>
                ) : (
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-brand-chip text-sm font-bold text-brand-accentBlue">
                    {speciesName.slice(0, 2).toUpperCase()}
                  </div>
                )}

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-base font-bold text-brand-text">{speciesName}</p>
                      {scientificName && (
                        <p className="truncate text-[11px] font-semibold tracking-[0.14em] text-brand-muted">{scientificName}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <span className="chip-quiet">
                        {detectionCount} {detectionCount === 1 ? "detection" : "detections"}
                      </span>
                      {confidenceLabel && <span className="text-xs font-semibold text-brand-accentTeal">{confidenceLabel}</span>}
                    </div>
                  </div>

                  <p className="text-xs text-brand-muted">Latest {recordedLabel} - {deviceLabel}</p>

                  {summary && (
                    <p className="text-sm leading-relaxed text-brand-text/90">
                      {visibleSummary}
                      {needsSummaryTruncate && !isSummaryExpanded && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedSummaries((current) => ({
                              ...current,
                              [summaryKey]: true
                            }))
                          }
                          className="ml-1 font-semibold text-brand-accentBlue underline underline-offset-4"
                          aria-label={`Show full description for ${speciesName}`}
                        >
                          More
                        </button>
                      )}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => openListenModal(detection, index)}
                      disabled={!hasPlayback}
                      className="rounded-full border border-brand-borderSubtle bg-brand-card px-3 py-1 font-semibold text-brand-accentBlue transition hover:border-brand-accentTeal hover:bg-brand-chip disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Listen {detection.recording.wav_id ? `(${detection.recording.wav_id})` : "clip"}
                    </button>

                    {infoHref ? (
                      <a
                        href={infoHref}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-brand-accentBlue underline underline-offset-4"
                      >
                        Learn more
                      </a>
                    ) : (
                      <span className="text-brand-muted">No species link</span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute right-3 top-3 rounded-full bg-slate-900/60 px-3 py-1 text-sm font-semibold text-white"
              aria-label="Close image preview"
            >
              Close
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-h-[82vh] w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      )}

      <RecordingListenModal
        isOpen={isListenOpen}
        clips={recordingClips}
        initialIndex={listenIndex}
        playbackFilter={playbackFilter}
        onClose={() => setListenOpen(false)}
      />
    </article>
  );
}
