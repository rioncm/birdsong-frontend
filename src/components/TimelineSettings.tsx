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

type DatePresetValue = "latest" | "today" | "yesterday" | "twoDaysAgo" | "custom";

const BUCKET_OPTIONS = [5, 10, 20, 30, 60];
const HOUR_OPTIONS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MINUTE_OPTIONS = [0, 15, 30, 45];

const DATE_PRESETS: Array<{ label: string; value: DatePresetValue; offset?: number }> = [
  { label: "Most recent", value: "latest" },
  { label: "Today", value: "today", offset: 0 },
  { label: "Yesterday", value: "yesterday", offset: -1 },
  { label: "Two days ago", value: "twoDaysAgo", offset: -2 },
  { label: "Custom date…", value: "custom" }
];

function startOfLocalDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, amount: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseCustomDate(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }
  const [yearStr, monthStr, dayStr] = value.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return undefined;
  }
  return new Date(year, month - 1, day);
}

export function TimelineSettings({
  isOpen,
  value,
  onApply,
  onClose,
  isApplying
}: TimelineSettingsProps): JSX.Element | null {
  const [bucketMinutes, setBucketMinutes] = useState<number>(value.bucketMinutes);
  const [datePreset, setDatePreset] = useState<DatePresetValue>("latest");
  const [customDate, setCustomDate] = useState<string>("");
  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);
  const [meridiem, setMeridiem] = useState<"AM" | "PM">("AM");

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setBucketMinutes(value.bucketMinutes);
    if (!value.startCursor) {
      setDatePreset("latest");
      setCustomDate("");
      const now = new Date();
      const minutes = now.getMinutes();
      const closestMinute = MINUTE_OPTIONS.reduce((prev, current) =>
        Math.abs(current - minutes) < Math.abs(prev - minutes) ? current : prev
      );
      setMinute(closestMinute);
      const rawHours = now.getHours();
      const nextMeridiem: "AM" | "PM" = rawHours >= 12 ? "PM" : "AM";
      let displayHour = rawHours % 12;
      if (displayHour === 0) {
        displayHour = 12;
      }
      setHour(displayHour);
      setMeridiem(nextMeridiem);
      return;
    }

    const local = new Date(value.startCursor);
    const today = startOfLocalDay(new Date());
    const yesterday = startOfLocalDay(addDays(today, -1));
    const twoDaysAgo = startOfLocalDay(addDays(today, -2));

    if (isSameDay(local, today)) {
      setDatePreset("today");
    } else if (isSameDay(local, yesterday)) {
      setDatePreset("yesterday");
    } else if (isSameDay(local, twoDaysAgo)) {
      setDatePreset("twoDaysAgo");
    } else {
      setDatePreset("custom");
      setCustomDate(formatInputDate(local));
    }

    const minutes = local.getMinutes();
    const closestMinute = MINUTE_OPTIONS.reduce((prev, current) =>
      Math.abs(current - minutes) < Math.abs(prev - minutes) ? current : prev
    );
    setMinute(closestMinute);

    const rawHours = local.getHours();
    const nextMeridiem: "AM" | "PM" = rawHours >= 12 ? "PM" : "AM";
    let displayHour = rawHours % 12;
    if (displayHour === 0) {
      displayHour = 12;
    }
    setHour(displayHour);
    setMeridiem(nextMeridiem);
  }, [isOpen, value.bucketMinutes, value.startCursor]);

  const isCustomDateRequired = datePreset === "custom";
  const disableTimeControls = datePreset === "latest";

  const canApply = useMemo(() => {
    if (datePreset === "custom" && !customDate) {
      return false;
    }
    return true;
  }, [customDate, datePreset]);

  const handleApply = () => {
    if (!canApply) {
      return;
    }

    if (datePreset === "latest") {
      onApply({
        bucketMinutes,
        startCursor: undefined
      });
      return;
    }

    let baseDate: Date | undefined;
    const preset = DATE_PRESETS.find((entry) => entry.value === datePreset);
    if (preset?.offset !== undefined) {
      baseDate = startOfLocalDay(addDays(new Date(), preset.offset));
    } else if (datePreset === "custom") {
      baseDate = parseCustomDate(customDate);
    }

    if (!baseDate) {
      onApply({
        bucketMinutes,
        startCursor: undefined
      });
      return;
    }

    let hour24 = hour % 12;
    if (meridiem === "PM") {
      hour24 += 12;
    }
    if (meridiem === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    const anchor = new Date(baseDate);
    anchor.setHours(hour24, minute, 0, 0);

    onApply({
      bucketMinutes,
      startCursor: anchor.toISOString()
    });
  };

  const handleReset = () => {
    setDatePreset("latest");
    setCustomDate("");
    onApply({
      bucketMinutes,
      startCursor: undefined
    });
  };

  if (!isOpen) {
    return null;
  }

  const baseFieldClass =
    "w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-brand-navy shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lagoon disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timeline-settings-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-brand-border bg-white p-6 shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 id="timeline-settings-title" className="text-lg font-heading text-brand-navy">
              Timeline settings
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              Adjust the bucket size, starting date, and time used when fetching timeline detections.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-brand-border bg-white p-2 text-brand-muted transition hover:text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lagoon"
            aria-label="Close timeline settings"
          >
            ×
          </button>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="settings-bucket">
              Bucket size
            </label>
            <select
              id="settings-bucket"
              className={baseFieldClass}
              value={bucketMinutes}
              onChange={(event) => setBucketMinutes(Number(event.target.value))}
              disabled={isApplying}
            >
              {BUCKET_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}-minute buckets
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="settings-date">
              Start date
            </label>
            <select
              id="settings-date"
              className={baseFieldClass}
              value={datePreset}
              onChange={(event) => setDatePreset(event.target.value as DatePresetValue)}
              disabled={isApplying}
            >
              {DATE_PRESETS.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
            {isCustomDateRequired ? (
              <input
                type="date"
                className={baseFieldClass}
                value={customDate}
                onChange={(event) => setCustomDate(event.target.value)}
                disabled={isApplying}
              />
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="settings-hour">
              Hour
            </label>
            <select
              id="settings-hour"
              className={baseFieldClass}
              value={hour}
              onChange={(event) => setHour(Number(event.target.value))}
              disabled={disableTimeControls || isApplying}
            >
              {HOUR_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <div className="col-span-2 flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="settings-minute">
                Minutes
              </label>
              <select
                id="settings-minute"
                className={baseFieldClass}
                value={minute}
                onChange={(event) => setMinute(Number(event.target.value))}
                disabled={disableTimeControls || isApplying}
              >
                {MINUTE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {`${option}`.padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="settings-meridiem">
                AM / PM
              </label>
              <select
                id="settings-meridiem"
                className={baseFieldClass}
                value={meridiem}
                onChange={(event) => setMeridiem(event.target.value as "AM" | "PM")}
                disabled={disableTimeControls || isApplying}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-brand-border bg-white px-5 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-surface disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isApplying}
          >
            Reset to latest
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-brand-border bg-white px-5 py-2 text-sm font-semibold text-brand-muted transition hover:bg-brand-surface disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isApplying}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded-full bg-brand-lagoon px-6 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!canApply || isApplying}
            >
              Apply settings
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
