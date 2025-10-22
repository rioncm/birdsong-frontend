/* eslint-disable @typescript-eslint/consistent-type-imports */
import { http, HttpResponse, delay } from "msw";

import type { DetectionTimelineResponse, QuarterPresetsResponse } from "../api/types";

const MOCK_SPECIES = [
  {
    id: "setophaga-coronata",
    scientific_name: "Setophaga coronata",
    common_name: "Yellow-rumped Warbler",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Yellow-rumped_Warbler.jpg",
    image_attribution: "Photo © Creative Commons / Wikimedia",
    image_source_url: "https://commons.wikimedia.org/wiki/File:Yellow-rumped_Warbler.jpg",
    summary: "A small songbird frequently detected during migration.",
    info_url: "https://www.allaboutbirds.org/guide/Yellow-rumped_Warbler"
  },
  {
    id: "cardinalis-cardinalis",
    scientific_name: "Cardinalis cardinalis",
    common_name: "Northern Cardinal",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/8/87/Cardinalis_cardinalis_male.jpg",
    image_attribution: "Photo © Creative Commons / Wikimedia",
    image_source_url: "https://commons.wikimedia.org/wiki/File:Cardinalis_cardinalis_male.jpg",
    summary: "A familiar backyard visitor with vibrant plumage.",
    info_url: "https://www.allaboutbirds.org/guide/Northern_Cardinal"
  }
];

function buildTimelineResponse(): DetectionTimelineResponse {
  const now = new Date();
  const buckets = Array.from({ length: 6 }).map((_, index) => {
    const start = new Date(now.getTime() - index * 5 * 60 * 1000);
    const end = new Date(start.getTime() + 5 * 60 * 1000);
    const species = MOCK_SPECIES[index % MOCK_SPECIES.length];

    return {
      bucket_start: start.toISOString(),
      bucket_end: end.toISOString(),
      total_detections: 1,
      unique_species: 1,
      detections: [
        {
          id: index + 1,
          recorded_at: start.toISOString(),
          device_name: "backyard-mic",
          confidence: 0.86,
          start_time: 5.3,
          end_time: 9.1,
          species,
          recording: {
            wav_id: `mock-${index}`,
            url: "https://example.com/mock.wav"
          },
          location_hint: "Backyard"
        }
      ]
    };
  });

  return {
    bucket_minutes: 5,
    has_more: true,
    next_cursor: buckets[buckets.length - 1]?.bucket_start ?? null,
    previous_cursor: buckets[0]?.bucket_end ?? null,
    buckets
  };
}

function buildQuarterResponse(): QuarterPresetsResponse {
  const date = new Date();
  const baseDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const quarters = [0, 6, 12, 18].map((hour, idx) => {
    const start = new Date(baseDate.getTime() + hour * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
    return {
      label: `Q${idx + 1}`,
      start: start.toISOString(),
      end: end.toISOString()
    };
  });

  return {
    date: baseDate.toISOString().slice(0, 10),
    current_label: "Q2",
    quarters
  };
}

export const handlers = [
  http.get("/detections/timeline", async () => {
    await delay(400);
    return HttpResponse.json(buildTimelineResponse());
  }),
  http.get("/detections/quarters", async () => {
    await delay(200);
    return HttpResponse.json(buildQuarterResponse());
  })
];
