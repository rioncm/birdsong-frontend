import { useEffect, useMemo, useState } from "react";

import type { PlaybackFilter } from "../services/userPreferences";

export interface TimelineSettingsValue {
  bucketMinutes: number;
  startCursor?: string | null;
  playbackFilter: PlaybackFilter;
}

interface TimelineSettingsProps {
  isOpen: boolean;
  value: TimelineSettingsValue;
  onApply: (nextValue: TimelineSettingsValue) => void;
  onClose: () => void;
  isApplying?: boolean;
}

const GROUPING_OPTIONS = [5, 10, 20, 30, 60];
const PLAYBACK_FILTER_OPTIONS: Array<{ value: PlaybackFilter; label: string; description: string }> = [
  { value: "none", label: "Original", description: "Play the recording as stored." },
  { value: "enhanced", label: "Enhanced", description: "Apply speech-noise reduction tuned for birdsong." }
];

function formatDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTimeInput(date: Date): string {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

function parseStartCursor(startCursor?: string | null): { date: string; time: string } | null {
  if (!startCursor) {
    return null;
  }
  const parsed = new Date(startCursor);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return {
    date: formatDateInput(parsed),
    time: formatTimeInput(parsed)
  };
}

function buildAnchorISO(dateValue: string, timeValue: string): string | null {
  if (!dateValue || !timeValue) {
    return null;
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  const [hours, minutes] = timeValue.split(":").map(Number);
  if ([year, month, day, hours, minutes].some((part) => Number.isNaN(part))) {
    return null;
  }

  const anchor = new Date(year, (month ?? 1) - 1, day ?? 1, hours, minutes, 0, 0);
  return anchor.toISOString();
}

function formatDisplayDateTime(dateValue: string, timeValue: string): string {
  const parsed = new Date(`${dateValue}T${timeValue}`);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  return parsed.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function TimelineSettings({
  isOpen,
  value,
  onApply,
  onClose,
  isApplying = false
}: TimelineSettingsProps): JSX.Element | null {
  const [bucketMinutes, setBucketMinutes] = useState<number>(value.bucketMinutes);
  const [anchorDate, setAnchorDate] = useState<string>("");
  const [anchorTime, setAnchorTime] = useState<string>("");
  const [playbackFilter, setPlaybackFilter] = useState<PlaybackFilter>(value.playbackFilter);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setBucketMinutes(value.bucketMinutes);
    const parsed = parseStartCursor(value.startCursor);
    setAnchorDate(parsed?.date ?? "");
    setAnchorTime(parsed?.time ?? "");
    setPlaybackFilter(value.playbackFilter);
  }, [isOpen, value.bucketMinutes, value.startCursor, value.playbackFilter]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen, onClose]);

  const isAnchored = anchorDate !== "" && anchorTime !== "";
  const canApply = !isAnchored || Boolean(buildAnchorISO(anchorDate, anchorTime));

  const previewLabel = useMemo(() => {
    const filterLabel = playbackFilter === "enhanced" ? "Enhanced playback filter" : "Original playback";
    if (!isAnchored) {
      return `Latest detections grouped in ${bucketMinutes}-minute intervals with ${filterLabel}.`;
    }
    const display = formatDisplayDateTime(anchorDate, anchorTime);
    if (!display) {
      return `Latest detections grouped in ${bucketMinutes}-minute intervals with ${filterLabel}.`;
    }
    return `${display} grouped in ${bucketMinutes}-minute intervals with ${filterLabel}.`;
  }, [anchorDate, anchorTime, bucketMinutes, isAnchored, playbackFilter]);

  const lastUpdatedLabel = useMemo(() => {
    if (!value.startCursor) {
      return "Most recent detections";
    }

    const parsed = new Date(value.startCursor);
    if (Number.isNaN(parsed.getTime())) {
      return "Most recent detections";
    }

    return parsed.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [value.startCursor]);

  const handleApply = () => {
    if (!canApply || isApplying) {
      return;
    }

    if (!isAnchored) {
      onApply({
        bucketMinutes,
        startCursor: undefined,
        playbackFilter
      });
      return;
    }

    const nextAnchor = buildAnchorISO(anchorDate, anchorTime);
    if (!nextAnchor) {
      return;
    }

    onApply({
      bucketMinutes,
      startCursor: nextAnchor,
      playbackFilter
    });
  };

  const handleReset = () => {
    setBucketMinutes(value.bucketMinutes);
    setAnchorDate("");
    setAnchorTime("");
    setPlaybackFilter(value.playbackFilter);
    onApply({
      bucketMinutes: value.bucketMinutes,
      startCursor: undefined,
      playbackFilter: value.playbackFilter
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center bg-slate-900/65 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timeline-settings-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-brand-borderSubtle bg-brand-card shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="border-b border-brand-borderSubtle bg-brand-cardHeader px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p id="timeline-settings-title" className="text-2xl font-bold text-brand-accentBlue">
                Timeline Settings
              </p>
              <p className="mt-1 text-sm text-brand-muted">
                Configure grouping and optional start anchor.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-brand-borderSubtle bg-brand-card px-3 py-1 text-sm font-semibold text-brand-muted transition hover:text-brand-text"
              aria-label="Close timeline settings"
            >
              Close
            </button>
          </div>
        </header>

        <div className="space-y-6 px-5 py-5">
          <section>
            <p className="mb-3 text-sm font-semibold text-brand-text">Time Grouping (Minutes)</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {GROUPING_OPTIONS.map((option) => {
                const isChecked = bucketMinutes === option;
                return (
                  <label
                    key={option}
                    className={[
                      "flex cursor-pointer items-center justify-center rounded-xl border px-2 py-3 text-center transition",
                      isChecked
                        ? "border-brand-accentBlue bg-brand-chip text-brand-accentBlue"
                        : "border-brand-borderSubtle bg-brand-card text-brand-muted hover:bg-brand-page"
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="timeline-grouping"
                      value={option}
                      checked={isChecked}
                      onChange={() => setBucketMinutes(option)}
                      disabled={isApplying}
                      className="sr-only"
                    />
                    <span className="text-sm font-bold">
                      {option}
                      <span className="ml-1 text-xs font-semibold uppercase tracking-wide">min</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          <section>
            <p className="mb-3 text-sm font-semibold text-brand-text">Recording Playback Filter</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PLAYBACK_FILTER_OPTIONS.map((option) => {
                const isChecked = playbackFilter === option.value;
                return (
                  <label
                    key={option.value}
                    className={[
                      "flex cursor-pointer flex-col gap-1 rounded-xl border px-3 py-3 transition",
                      isChecked
                        ? "border-brand-accentBlue bg-brand-chip text-brand-accentBlue"
                        : "border-brand-borderSubtle bg-brand-card text-brand-muted hover:bg-brand-page"
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="timeline-playback-filter"
                      value={option.value}
                      checked={isChecked}
                      onChange={() => setPlaybackFilter(option.value)}
                      disabled={isApplying}
                      className="sr-only"
                    />
                    <span className="text-sm font-bold">{option.label}</span>
                    <span className="text-xs leading-relaxed text-current/80">{option.description}</span>
                  </label>
                );
              })}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted" htmlFor="timeline-start-date">
                Start Date
              </label>
              <input
                id="timeline-start-date"
                type="date"
                value={anchorDate}
                onChange={(event) => setAnchorDate(event.target.value)}
                disabled={isApplying}
                className="w-full rounded-xl border border-brand-borderSubtle bg-brand-input px-3 py-3 text-sm font-medium text-brand-text outline-none transition focus:border-brand-focus focus:ring-2 focus:ring-brand-focus/30"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted" htmlFor="timeline-start-time">
                Start Time (24h)
              </label>
              <input
                id="timeline-start-time"
                type="time"
                value={anchorTime}
                onChange={(event) => setAnchorTime(event.target.value)}
                disabled={isApplying}
                className="w-full rounded-xl border border-brand-borderSubtle bg-brand-input px-3 py-3 text-sm font-medium text-brand-text outline-none transition focus:border-brand-focus focus:ring-2 focus:ring-brand-focus/30"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-brand-borderSubtle bg-brand-page px-4 py-4">
            <p className="text-sm font-semibold text-brand-text">Timeline Preview</p>
            <p className="mt-1 text-sm text-brand-muted">{previewLabel}</p>
          </section>
        </div>

        <footer className="flex flex-col gap-3 border-t border-brand-borderSubtle bg-brand-cardHeader px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-muted">
            Last updated: <span className="font-semibold text-brand-text">{lastUpdatedLabel}</span>
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isApplying}
              className="rounded-lg border border-brand-borderStrong bg-brand-card px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-page disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!canApply || isApplying}
              className="rounded-lg bg-brand-accentBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-accentTeal disabled:cursor-not-allowed disabled:opacity-60"
            >
              Apply
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
