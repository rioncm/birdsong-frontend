import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { fetchQuarters, fetchTimeline } from "../api/client";
import type { DetectionTimelineResponse, QuarterPresetsResponse } from "../api/types";

const BUCKET_MINUTES = 5;
const DEFAULT_LIMIT = 12;

export function useTimeline() {
  return useInfiniteQuery<DetectionTimelineResponse>({
    queryKey: ["timeline", BUCKET_MINUTES],
    queryFn: async ({ pageParam }) => {
      return fetchTimeline({
        bucketMinutes: BUCKET_MINUTES,
        limit: DEFAULT_LIMIT,
        before: typeof pageParam === "string" ? pageParam : undefined
      });
    },
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
    initialPageParam: undefined
  });
}

export function useQuarterPresets(date?: string) {
  return useQuery<QuarterPresetsResponse>({
    queryKey: ["quarters", date],
    queryFn: () => fetchQuarters(date),
    staleTime: 5 * 60 * 1000
  });
}
