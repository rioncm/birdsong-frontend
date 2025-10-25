export interface SpeciesPreview {
  id: string;
  common_name?: string;
  scientific_name?: string;
  genus?: string;
  family?: string;
  image_url?: string;
  image_attribution?: string;
  image_source_url?: string;
  summary?: string;
  info_url?: string;
}

export interface RecordingPreview {
  wav_id?: string;
  path?: string;
  url?: string;
  duration_seconds?: number;
}

export interface DetectionItem {
  id: number;
  recorded_at?: string;
  device_id?: string;
  device_name?: string;
  device_display_name?: string;
  confidence?: number;
  start_time?: number;
  end_time?: number;
  species: SpeciesPreview;
  recording: RecordingPreview;
  location_hint?: string;
  detection_count?: number;
}

export interface TimelineBucket {
  bucket_start: string | null;
  bucket_end: string | null;
  total_detections: number;
  unique_species: number;
  detections: DetectionItem[];
}

export interface DetectionTimelineResponse {
  bucket_minutes: number;
  has_more: boolean;
  next_cursor?: string | null;
  previous_cursor?: string | null;
  buckets: TimelineBucket[];
}

export interface QuarterWindow {
  label: string;
  start: string;
  end: string;
}

export interface QuarterPresetsResponse {
  date: string;
  current_label?: string | null;
  quarters: QuarterWindow[];
}
