# BirdSong Frontend Overview

The BirdSong frontend is a mobile-first, read-only client for the BirdSong detection platform. It runs entirely in the browser, consuming HTTP APIs exposed by the backend. The app favors rapid browseability, quick sharing of detections, and low-friction access for casual visitors.

## Product Goals
- Present recent bird activity in an approachable timeline without requiring authentication.
- Spotlight notable detections (rare species, first-of-season returns) while still surfacing routine sightings.
- Keep the interface performant on mid-range mobile hardware and usable outdoors.
- Provide simple controls for jumping to historical detections and returning to the latest activity.

## Target Audience
- Backyard birders monitoring local wildlife.
- Researchers or staff validating deployments.
- Prospective users assessing BirdSong’s data quality.

## Core UX Concepts
- **Timeline buckets (5-minute windows)**: all detections captured in the same 5-minute interval render as a single bucket, minimizing scroll fatigue.
- **Detection cards**: individual detections show species imagery, scientific/common names, confidence, optional audio playback, and source location hints.
- **Quarter-day presets**: users land on the most recent completed quarter (00, 06, 12, 18 hour blocks) with quick shortcuts to others.
- **Time travel controls**: date + quarter picker plus infinite scroll to explore older activity.
- **Contextual summaries**: lightweight chips summarizing unique species counts and total detections for the active window.

## Tentative Stack
- **Framework**: TypeScript + React with Vite for bundling and React Router for routing.
- **UI Layer**: Tailwind CSS + Radix UI primitives (TBC) to accelerate accessible component development.
- **Data Layer**: TanStack Query (React Query) for API data fetching/caching keyed by time ranges.
- **Audio**: HTML5 `<audio>` fed by backend-hosted WAV/MP3 URLs (user-initiated playback only).
- **Tooling**: ESLint + Prettier + Testing Library/Vitest.

Open questions:
- Q: Final confirmation on the component library (Tailwind + Radix vs. alternative).
    - Approved
- Q: Hosting target (static CDN, Netlify, etc.) to ensure routing compatibility.
    - Hosting will most often be on a private home network in docker containers
    - SSL will not often be used. In cases where SSL is used it will be beind a reverse proxy.

## Screens & Navigation
1. **Timeline (root)**  
   Header with logo, last updated timestamp, quarter selector, and quick jump to “latest” button. Scrollable list of timeline buckets sorted newest → oldest.
2. **Bucket detail drawer**  
   When a bucket contains multiple detections, tapping expands a drawer/modal listing each detection card (image, metadata, audio link).
3. **Species spotlight (stretch)**  
   Optional quick view overlay showing species summary, taxonomy, and external links powered by `/species/{id}`.
4. **About / Data Sources**  
   Static page acknowledging data providers, attribution requirements, and support contact.

## Data Flow Overview
1. App boots static bundle → fetches configuration (quarters, health) from backend.
2. Timeline view requests detections for the current quarter. Expect server-side bucketed response (see `integration_notes.md`).
3. Infinite scroll fetches adjacent quarters using cursor-based parameters (e.g., `before`, `after` timestamps).
4. Detection cards lazy-load species imagery and audio; placeholders appear while data resolves.
5. Errors (network/offline) surface inline with retry affordances.

## Accessibility & Performance
- Adhere to WCAG 2.1 AA color contrast; design for outdoor readability.
- Provide textual alternatives and explicit credits for images per provider requirements.
- Respect `prefers-reduced-motion`; avoid aggressive scroll animations.
- Target sub-2s first contentful paint on 3G-fast mobile connections.
- No offline requirement, but cache recently viewed buckets for smoother back/forward navigation.

## Analytics & Telemetry (TBD)
- Minimal telemetry in v1 (page views, bucket expansion). Consider privacy posture before enabling.
- Capture uncaught errors in console; optional future integration with lightweight error-reporting service.

## Assumptions
- Backend v1.1 will expose: bucketed detections, cursor-based pagination, accessible media URLs, and location metadata.
- All endpoints remain public (no auth tokens required).
- Deployments serve over HTTPS with valid certificates.

## Risks & Dependencies
- Backend gaps (timeline aggregation, media URLs) must ship before frontend beta.
- Large detection volumes could force client-controlled pagination; server aggregation preferred.
- Image licensing details may require UI adjustments.

## Next Steps
1. Lock framework/UI kit decision.
2. Align with backend team on integration roadmap.
3. Produce wireframes for timeline, bucket detail, and navigation states.
4. Begin component prototyping once data contracts are stable.
