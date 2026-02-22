import axios from "axios";

import { config } from "../config";
import type {
  DetectionTimelineResponse,
  QuarterPresetsResponse,
  RecordingMetadata
} from "./types";

const http = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10_000
});

const LOCAL_FALLBACK_BASE_URL = "http://localhost:8000";

function isLocalBrowser(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

function canRetryWithLocalBackend(error: unknown): boolean {
  if (!isLocalBrowser()) {
    return false;
  }
  if (config.apiBaseUrl === LOCAL_FALLBACK_BASE_URL) {
    return false;
  }
  if (!axios.isAxiosError(error)) {
    return false;
  }

  // Retry if the configured endpoint is down, or looks like an outdated API edge.
  if (!error.response) {
    return true;
  }
  return [404, 502, 503, 504].includes(error.response.status);
}

async function getWithFallback<T>(
  path: string,
  params?: Record<string, unknown>
): Promise<T> {
  try {
    const response = await http.get<T>(path, { params });
    return response.data;
  } catch (error) {
    if (!canRetryWithLocalBackend(error)) {
      throw error;
    }

    const fallbackClient = axios.create({
      baseURL: LOCAL_FALLBACK_BASE_URL,
      timeout: 10_000
    });
    const response = await fallbackClient.get<T>(path, { params });
    return response.data;
  }
}

export async function fetchTimeline(params: {
  bucketMinutes?: number;
  limit?: number;
  before?: string;
  after?: string;
}): Promise<DetectionTimelineResponse> {
  const { bucketMinutes, ...rest } = params;
  const queryParams = {
    ...rest,
    ...(typeof bucketMinutes === "number" ? { bucket_minutes: bucketMinutes } : {})
  };
  return getWithFallback<DetectionTimelineResponse>("/detections/timeline", queryParams);
}

export async function fetchQuarters(date?: string): Promise<QuarterPresetsResponse> {
  return getWithFallback<QuarterPresetsResponse>("/detections/quarters", { date });
}

export async function fetchRecordingMetadata(wavId: string): Promise<RecordingMetadata> {
  return getWithFallback<RecordingMetadata>(`/recordings/${encodeURIComponent(wavId)}/meta`);
}
