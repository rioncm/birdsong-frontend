import { useEffect, useMemo, useState } from "react";

export interface TimelineSelectorValue {
  bucketMinutes: number;
  startCursor?: string | null;
}

interface TimelineSelectorProps {
  value: TimelineSelectorValue;
  onChange: (nextValue: TimelineSelectorValue) => void;
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

export function TimelineSelector({ value, onChange, isApplying }: TimelineSelectorProps): JSX.Element {
  const [bucketMinutes, setBucketMinutes] = useState<number>(value.bucketMinutes);
  const [datePreset, setDatePreset] = useState<DatePresetValue>("latest");
  const [customDate, setCustomDate] = useState<string>("");
  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);
  const [meridiem, setMeridiem] = useState<"AM" | "PM">("AM");

  useEffect(() => {
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
  }, [value.bucketMinutes, value.startCursor]);

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
      onChange({
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
      onChange({
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

    onChange({
      bucketMinutes,
      startCursor: anchor.toISOString()
    });
  };

  const handleReset = () => {
    setDatePreset("latest");
    setCustomDate("");
    onChange({
      bucketMinutes,
      startCursor: undefined
    });
  };

  const summaryText = useMemo(() => {
    if (!value.startCursor) {
      return "Showing the latest detections.";
    }
    const local = new Date(value.startCursor);
    const formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    });
    return `Anchored at ${formatter.format(local)}.`;
  }, [value.startCursor]);

  const baseFieldClass =
    "w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-brand-navy shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lagoon disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <section className="rounded-[28px] border border-brand-border bg-white px-5 py-4 shadow-card">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
            Timeline Controls
          </h2>
          <p className="mt-1 text-sm text-brand-text/80">{summaryText}</p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-surface"
          disabled={isApplying}
        >
          Reset to latest
        </button>
      </header>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="bucket-minutes">
            Bucket size
          </label>
          <select
            id="bucket-minutes"
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
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="date-preset">
            Start date
          </label>
          <select
            id="date-preset"
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
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="hour-select">
            Hour
          </label>
          <select
            id="hour-select"
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

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-2 md:col-span-2 lg:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="minute-select">
              Minutes
            </label>
            <select
              id="minute-select"
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
          <div className="col-span-2 flex flex-col gap-2 md:col-span-2 lg:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted" htmlFor="meridiem-select">
              AM / PM
            </label>
            <select
              id="meridiem-select"
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

      <footer className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={handleApply}
          className="rounded-full bg-brand-lagoon px-6 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!canApply || isApplying}
        >
          Apply filters
        </button>
      </footer>
    </section>
  );
}
