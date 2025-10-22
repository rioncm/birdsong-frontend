import axios from "axios";

import { config } from "../config";
import type {
  DetectionTimelineResponse,
  QuarterPresetsResponse
} from "./types";

const http = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10_000
});

export async function fetchTimeline(params: {
  bucketMinutes?: number;
  limit?: number;
  before?: string;
  after?: string;
}): Promise<DetectionTimelineResponse> {
  const response = await http.get<DetectionTimelineResponse>("/detections/timeline", {
    params
  });
  return response.data;
}

export async function fetchQuarters(date?: string): Promise<QuarterPresetsResponse> {
  const response = await http.get<QuarterPresetsResponse>("/detections/quarters", {
    params: { date }
  });
  return response.data;
}
