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

function normalizeIsoCursor(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }
  return value.endsWith("Z") ? value.slice(0, -1) + "+00:00" : value;
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
    before: normalizeIsoCursor(rest.before),
    after: normalizeIsoCursor(rest.after),
    ...(typeof bucketMinutes === "number" ? { bucket_minutes: bucketMinutes } : {})
  };
  const response = await http.get<DetectionTimelineResponse>("/detections/timeline", {
    params: queryParams
  });
  return response.data;
}

export async function fetchQuarters(date?: string): Promise<QuarterPresetsResponse> {
  const response = await http.get<QuarterPresetsResponse>("/detections/quarters", {
    params: { date }
  });
  return response.data;
}

export async function fetchRecordingMetadata(
  wavId: string,
  options?: {
    playbackFilter?: "none" | "enhanced";
    outputFormat?: "wav" | "mp3" | "ogg";
  }
): Promise<RecordingMetadata> {
  const response = await http.get<RecordingMetadata>(`/recordings/${encodeURIComponent(wavId)}/meta`, {
    params: {
      ...(options?.playbackFilter ? { filter: options.playbackFilter } : {}),
      ...(options?.outputFormat ? { format: options.outputFormat } : {})
    }
  });
  return response.data;
}
