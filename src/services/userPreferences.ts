import { DEFAULT_BUCKET_MINUTES } from "../hooks/useTimeline";

const STORAGE_KEY = "birdsong:user-preferences";
const CURRENT_VERSION = 1;

export interface TimelinePreferences {
  bucketMinutes: number;
  startCursor: string | null;
}

export interface UserPreferences {
  version: number;
  timeline: TimelinePreferences;
}

export type UserPreferencesUpdate =
  | Partial<Omit<UserPreferences, "timeline">> & { timeline?: Partial<TimelinePreferences> }
  | ((current: UserPreferences) => UserPreferences);

type Subscriber = () => void;

const DEFAULT_PREFERENCES: UserPreferences = Object.freeze({
  version: CURRENT_VERSION,
  timeline: Object.freeze({
    bucketMinutes: DEFAULT_BUCKET_MINUTES,
    startCursor: null
  })
});

let inMemoryFallback: UserPreferences | null = null;
let currentState: UserPreferences = loadInitialPreferences();
const subscribers = new Set<Subscriber>();

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function clonePreferences(value: UserPreferences): UserPreferences {
  return {
    version: value.version,
    timeline: {
      bucketMinutes: value.timeline.bucketMinutes,
      startCursor: value.timeline.startCursor
    }
  };
}

function sanitizeTimeline(
  value: Partial<TimelinePreferences> | undefined,
  fallback: TimelinePreferences = DEFAULT_PREFERENCES.timeline
): TimelinePreferences {
  const bucketMinutes =
    typeof value?.bucketMinutes === "number" && Number.isFinite(value.bucketMinutes) && value.bucketMinutes > 0
      ? Math.floor(value.bucketMinutes)
      : fallback.bucketMinutes;
  const startCursor =
    typeof value?.startCursor === "string" && value.startCursor.trim().length > 0
      ? value.startCursor
      : value?.startCursor === null
      ? null
      : fallback.startCursor;
  return {
    bucketMinutes,
    startCursor
  };
}

function migratePreferences(raw: unknown): UserPreferences {
  if (!raw || typeof raw !== "object") {
    return clonePreferences(DEFAULT_PREFERENCES);
  }
  const candidate = raw as Record<string, unknown>;
  const rawVersion = typeof candidate.version === "number" ? candidate.version : 0;
  const timeline = sanitizeTimeline(candidate.timeline as Partial<TimelinePreferences>, DEFAULT_PREFERENCES.timeline);
  return {
    version: rawVersion >= CURRENT_VERSION ? rawVersion : CURRENT_VERSION,
    timeline
  };
}

function readFromStorage(): UserPreferences | null {
  if (!isBrowser()) {
    return inMemoryFallback ? clonePreferences(inMemoryFallback) : null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as unknown;
    return migratePreferences(parsed);
  } catch (error) {
    console.warn("Failed to read user preferences from storage:", error);
    return null;
  }
}

function writeToStorage(next: UserPreferences): void {
  if (!isBrowser()) {
    inMemoryFallback = clonePreferences(next);
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn("Failed to persist user preferences to storage:", error);
  }
}

function loadInitialPreferences(): UserPreferences {
  const stored = readFromStorage();
  if (stored) {
    return freezePreferences(stored);
  }
  writeToStorage(DEFAULT_PREFERENCES);
  return DEFAULT_PREFERENCES;
}

function freezePreferences(value: UserPreferences): UserPreferences {
  return Object.freeze({
    version: value.version,
    timeline: Object.freeze({
      bucketMinutes: value.timeline.bucketMinutes,
      startCursor: value.timeline.startCursor
    })
  });
}

function setState(next: UserPreferences, options: { persist?: boolean } = {}): void {
  const nextState: UserPreferences = {
    version: CURRENT_VERSION,
    timeline: sanitizeTimeline(next.timeline, currentState.timeline)
  };
  currentState = freezePreferences(nextState);
  if (options.persist !== false) {
    writeToStorage(currentState);
  }
  emitChange();
}

function emitChange(): void {
  subscribers.forEach((callback) => {
    try {
      callback();
    } catch (error) {
      console.error("User preferences subscriber failed:", error);
    }
  });
}

export function getUserPreferences(): UserPreferences {
  return currentState;
}

export function updateUserPreferences(update: UserPreferencesUpdate): UserPreferences {
  const base = clonePreferences(currentState);
  const next =
    typeof update === "function"
      ? update(base)
      : {
          ...base,
          ...update,
          timeline: {
            ...base.timeline,
            ...update.timeline
          }
        };

  const sanitized: UserPreferences = {
    version: CURRENT_VERSION,
    timeline: sanitizeTimeline(next.timeline, currentState.timeline)
  };

  setState(sanitized);
  return currentState;
}

export function updateTimelinePreferences(
  update:
    | Partial<TimelinePreferences>
    | ((current: TimelinePreferences) => Partial<TimelinePreferences> | TimelinePreferences)
): TimelinePreferences {
  const next = typeof update === "function" ? { ...update(currentState.timeline) } : { ...update };
  const merged: TimelinePreferences = {
    bucketMinutes: typeof next.bucketMinutes === "number" ? next.bucketMinutes : currentState.timeline.bucketMinutes,
    startCursor:
      typeof next.startCursor === "string" || next.startCursor === null
        ? next.startCursor
        : currentState.timeline.startCursor
  };
  setState({
    version: CURRENT_VERSION,
    timeline: sanitizeTimeline(merged, currentState.timeline)
  });
  return currentState.timeline;
}

export function resetUserPreferences(): UserPreferences {
  setState(clonePreferences(DEFAULT_PREFERENCES));
  return currentState;
}

export function subscribeToUserPreferences(subscriber: Subscriber): () => void {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
}

if (isBrowser()) {
  window.addEventListener("storage", (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) {
      return;
    }
    const updated = readFromStorage();
    if (!updated) {
      return;
    }
    setState(updated, { persist: false });
  });
}

export const userPreferencesStore = {
  getSnapshot: getUserPreferences,
  subscribe: subscribeToUserPreferences,
  update: updateUserPreferences,
  updateTimeline: updateTimelinePreferences,
  reset: resetUserPreferences
};
