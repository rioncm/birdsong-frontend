import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { fetchQuarters, fetchTimeline } from "../api/client";
import type { DetectionTimelineResponse, QuarterPresetsResponse } from "../api/types";

export const DEFAULT_BUCKET_MINUTES = 5;
const DEFAULT_LIMIT = 12;

interface UseTimelineOptions {
  bucketMinutes: number;
  startCursor?: string | null;
  limit?: number;
}

export function useTimeline({
  bucketMinutes,
  startCursor,
  limit = DEFAULT_LIMIT
}: UseTimelineOptions) {
  return useInfiniteQuery<DetectionTimelineResponse>({
    queryKey: ["timeline", bucketMinutes, startCursor ?? null, limit],
    queryFn: async ({ pageParam }) => {
      const isInitialPage = typeof pageParam === "undefined";
      return fetchTimeline({
        bucketMinutes,
        limit,
        before: typeof pageParam === "string" ? pageParam : undefined,
        after: isInitialPage && startCursor ? startCursor : undefined
      });
    },
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
    initialPageParam: undefined
  });
}

export function useQuarterPresets(date?: string) {
  return useQuery<QuarterPresetsResponse>({
    queryKey: ["quarters", date ?? "latest"],
    queryFn: () => fetchQuarters(date),
    staleTime: 5 * 60 * 1000
  });
}
