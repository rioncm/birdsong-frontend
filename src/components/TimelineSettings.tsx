import { useEffect, useMemo, useState } from "react";

export interface TimelineSettingsValue {
  bucketMinutes: number;
  startCursor?: string | null;
}

interface TimelineSettingsProps {
  isOpen: boolean;
  value: TimelineSettingsValue;
  onApply: (nextValue: TimelineSettingsValue) => void;
  onClose: () => void;
  isApplying?: boolean;
}

const GROUPING_OPTIONS = [5, 10, 20, 30, 60];

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

function buildAnchorISO(dateValue: string, timeValue: string): string | null {
  if (!dateValue || !timeValue) {
    return null;
  }
  const [hours, minutes] = timeValue.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }
  const [year, month, day] = dateValue.split("-").map(Number);
  if ([year, month, day].some((part) => Number.isNaN(part))) {
    return null;
  }
  const anchor = new Date(year, (month ?? 1) - 1, day ?? 1);
  anchor.setHours(hours, minutes, 0, 0);
  return anchor.toISOString();
}

function parseStartCursor(startCursor?: string | null) {
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

function formatDateTimeDisplay(dateValue: string, timeValue: string): string {
  const parsed = new Date(`${dateValue}T${timeValue}`);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(parsed);
}

export function TimelineSettings({
  isOpen,
  value,
  onApply,
  onClose,
  isApplying
}: TimelineSettingsProps): JSX.Element | null {
  const [bucketMinutes, setBucketMinutes] = useState<number>(value.bucketMinutes);
  const [anchorDate, setAnchorDate] = useState<string>("");
  const [anchorTime, setAnchorTime] = useState<string>("");
  const [isAnchored, setIsAnchored] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setBucketMinutes(value.bucketMinutes);

    const parsed = parseStartCursor(value.startCursor);
    if (parsed) {
      setIsAnchored(true);
      setAnchorDate(parsed.date);
      setAnchorTime(parsed.time);
    } else {
      setIsAnchored(false);
      const now = new Date();
      setAnchorDate(formatDateInput(now));
      setAnchorTime(formatTimeInput(now));
    }
  }, [isOpen, value.bucketMinutes, value.startCursor]);

  const canApply = useMemo(() => {
    if (!isAnchored) {
      return true;
    }
    return Boolean(anchorDate && anchorTime);
  }, [anchorDate, anchorTime, isAnchored]);

  const previewText = useMemo(() => {
    if (isAnchored && anchorDate && anchorTime) {
      return `Anchored at ${formatDateTimeDisplay(anchorDate, anchorTime)} · ${bucketMinutes}-minute buckets.`;
    }
    return `Showing the latest detections in ${bucketMinutes}-minute buckets.`;
  }, [anchorDate, anchorTime, bucketMinutes, isAnchored]);

  const lastUpdatedLabel = useMemo(() => {
    if (!value.startCursor) {
      return "Most recent detections";
    }
    const parsed = new Date(value.startCursor);
    if (Number.isNaN(parsed.getTime())) {
      return "Most recent detections";
    }
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(parsed);
  }, [value.startCursor]);

  const handleApply = () => {
    if (!canApply) {
      return;
    }

    if (!isAnchored) {
      onApply({
        bucketMinutes,
        startCursor: undefined
      });
      return;
    }

    const iso = buildAnchorISO(anchorDate, anchorTime);
    if (!iso) {
      return;
    }

    onApply({
      bucketMinutes,
      startCursor: iso
    });
  };

  const handleReset = () => {
    setBucketMinutes(value.bucketMinutes);
    setIsAnchored(false);
    const now = new Date();
    setAnchorDate(formatDateInput(now));
    setAnchorTime(formatTimeInput(now));
    onApply({
      bucketMinutes: value.bucketMinutes,
      startCursor: undefined
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timeline-settings-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative isolate flex items-center justify-center px-4 py-10">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-32 -left-32 h-[60vh] w-[60vh] rounded-full bg-gradient-to-br from-indigo-200 via-lime-200 to-purple-300 opacity-20 blur-2xl" />
            <div className="absolute -bottom-20 right-10 h-[40vh] w-[50vh] rounded-full bg-gradient-to-tr from-fuchsia-300 via-orange-300 to-rose-200 opacity-40 blur-3xl" />
            <div className="absolute top-28 left-1/4 h-[35vh] w-[45vh] rounded-full bg-gradient-to-b from-orange-300 via-amber-200 to-rose-100 opacity-60 blur-3xl" />
          </div>

          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl">
            <header className="flex items-start justify-between border-b border-neutral-200 bg-neutral-50 px-6 py-5">
              <div className="space-y-1">
                <p id="timeline-settings-title" className="text-2xl font-bold text-neutral-900">
                  Timeline Settings
                </p>
                <p className="text-sm text-neutral-600">
                  Configure your timeline start date, time, and grouping interval.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-neutral-300 bg-white p-2 text-neutral-500 transition hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
                aria-label="Close timeline settings"
              >
                ×
              </button>
            </header>

            <div className="space-y-8 px-6 py-8">
              <section>
                <p className="mb-3 text-sm font-semibold text-neutral-800">Time Grouping (Minutes)</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {GROUPING_OPTIONS.map((option) => {
                    const isActive = bucketMinutes === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setBucketMinutes(option)}
                        disabled={isApplying}
                        className={[
                          "flex items-center justify-center rounded-xl border-2 px-4 py-4 text-center transition",
                          "bg-neutral-50 hover:bg-neutral-100",
                          isActive ? "border-neutral-900 text-neutral-900" : "border-neutral-200 text-neutral-600",
                          isApplying ? "opacity-60" : ""
                        ].join(" ")}
                        aria-pressed={isActive}
                      >
                        <span className="text-center">
                          <span className="block text-lg font-bold">{option}</span>
                          <span className="mt-1 block text-xs text-neutral-500">min</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-neutral-800">Timeline Start</p>
                  <label className="flex items-center gap-2 text-xs font-medium text-neutral-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-neutral-300 text-neutral-800 focus:ring-neutral-500"
                      checked={isAnchored}
                      onChange={(event) => setIsAnchored(event.target.checked)}
                      disabled={isApplying}
                    />
                    Pin to specific date &amp; time
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="timeline-start-date" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Date
                    </label>
                    <input
                      id="timeline-start-date"
                      type="date"
                      value={anchorDate}
                      onChange={(event) => setAnchorDate(event.target.value)}
                      disabled={!isAnchored || isApplying}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeline-start-time" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Time (24-hour)
                    </label>
                    <input
                      id="timeline-start-time"
                      type="time"
                      value={anchorTime}
                      onChange={(event) => setAnchorTime(event.target.value)}
                      disabled={!isAnchored || isApplying}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>
                <p className="text-xs text-neutral-500">
                  Leave the toggle off to stream the newest detections. Enable it to review a specific point in time.
                </p>
              </section>

              <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-neutral-500">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <path
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-neutral-800">Timeline Preview</p>
                    <p className="mt-1 text-xs text-neutral-600">{previewText}</p>
                  </div>
                </div>
              </section>
            </div>

            <footer className="flex flex-col gap-3 border-t border-neutral-200 bg-neutral-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-neutral-500">
                Last applied anchor:
                <span className="ml-1 font-medium text-neutral-700">{lastUpdatedLabel}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isApplying}
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!canApply || isApplying}
                >
                  Apply Settings
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
