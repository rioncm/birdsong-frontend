# Frontend ↔ Backend Integration Notes

This document tracks how the planned frontend experience maps to the current BirdSong API, and where we may need new or expanded endpoints (targets for backend v1.1).

## Existing API Surface (backend/app/api.py)
- `GET /detections` (`DetectionFeedResponse`)  
  - Filters: optional `date` (YYYY-MM-DD), `species_id`, `min_confidence`.  
  - Pagination: `page`, `page_size` (offset-based).  
  - Returns flat detections with ISO `recorded_at`, species metadata, and recording path.
- `GET /species/{species_id}` (`SpeciesDetailResponse`)  
  - Provides taxonomic info, AI summary, and citation details per species.
- Other modules (e.g., `/analyze` ingestion endpoints) exist but are not directly used by the read-only frontend.

## Gaps & Follow-ups for v1.1
1. **Timeline bucketing**  
   - Frontend needs detections grouped into 5-minute windows. Current `/detections` response is flat; grouping would require client-side processing of large pages.  
   - Proposal: add optional `bucket=5m` flag returning aggregated buckets with nested detections, or expose a dedicated `/detections/timeline` endpoint accepting `start`, `end`, and bucket size.

2. **Time-range pagination**  
   - Infinite scroll requires deterministic cursors (e.g., `before`/`after` timestamps). Offset pagination will skip or duplicate entries as new detections arrive.  
   - Proposal: support `before=<ISO>` and `limit` to fetch earlier buckets relative to a cursor.

3. **Quarter-day presets**  
   - UI defaults to most recent quarter. Backend should expose either:  
     - helper endpoint `/detections/quarters` returning available ranges per day, or  
     - ability to query `/detections` with `start`/`end` timestamps (see #1).

4. **Media URLs**  
   - `recording.path` currently returns a filesystem path (e.g., `/app/data/...`). Frontend needs a downloadable/streamable URL, ideally signed or proxied through an API endpoint.

5. **Location metadata**  
   - `location_hint` is hard-coded to `"unknown"`. If cameras/mics carry location labels, surface them so the UI can show origin per detection bucket.

6. **Image attribution details**  
   - Response includes `image_url` but lacks attribution text/source license. Consider adding `image_credit` / `image_source_url` to support required credits.

7. **Health / status endpoint**  
   - Helpful for frontend to detect maintenance mode or empty-state messaging (optional but nice-to-have).

## Open Questions for Backend Team
- Should summary stats (total detections, unique species) be computed server-side for custom ranges?  
- Are there rate limits we must respect when polling for new detections?  
- Any plan for websockets or SSE in future releases? (If so, keep naming consistent.)  
- How will authentication evolve if/when user accounts land (impacting anonymous frontend)?
