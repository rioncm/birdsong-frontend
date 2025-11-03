import { useCallback } from "react";
import { useSyncExternalStore } from "react";

import type { TimelinePreferences, UserPreferences, UserPreferencesUpdate } from "../services/userPreferences";
import { userPreferencesStore } from "../services/userPreferences";

export interface UseUserPreferencesResult {
  preferences: UserPreferences;
  setPreferences: (update: UserPreferencesUpdate) => void;
  updateTimeline: (
    update:
      | Partial<TimelinePreferences>
      | ((current: TimelinePreferences) => Partial<TimelinePreferences> | TimelinePreferences)
  ) => void;
  resetPreferences: () => void;
}

export function useUserPreferences(): UseUserPreferencesResult {
  const preferences = useSyncExternalStore(userPreferencesStore.subscribe, userPreferencesStore.getSnapshot);

  const setPreferences = useCallback((update: UserPreferencesUpdate) => {
    userPreferencesStore.update(update);
  }, []);

  const updateTimeline = useCallback<
    UseUserPreferencesResult["updateTimeline"]
  >((update) => {
    userPreferencesStore.updateTimeline(update);
  }, []);

  const resetPreferences = useCallback(() => {
    userPreferencesStore.reset();
  }, []);

  return {
    preferences,
    setPreferences,
    updateTimeline,
    resetPreferences
  };
}
